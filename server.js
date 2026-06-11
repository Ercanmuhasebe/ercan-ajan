const http = require("http");
const fs = require("fs");
const path = require("path");

const publicDirectory = __dirname;
const port = Number(process.env.PORT) || 8787;
const model = process.env.OPENAI_MODEL || "gpt-5.5";

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

function sendJson(response, statusCode, value) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(value));
}

function readJsonBody(request) {
  return new Promise(function (resolve, reject) {
    let body = "";

    request.on("data", function (chunk) {
      body = body + chunk;

      if (body.length > 20_000) {
        reject(new Error("Istek cok buyuk."));
        request.destroy();
      }
    });

    request.on("end", function () {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch (error) {
        reject(new Error("Gecersiz JSON."));
      }
    });

    request.on("error", reject);
  });
}

function extractAnswer(apiResponse) {
  if (typeof apiResponse.output_text === "string") {
    return apiResponse.output_text.trim();
  }

  const textParts = [];

  if (Array.isArray(apiResponse.output)) {
    apiResponse.output.forEach(function (item) {
      if (!Array.isArray(item.content)) {
        return;
      }

      item.content.forEach(function (content) {
        if (
          content.type === "output_text" &&
          typeof content.text === "string"
        ) {
          textParts.push(content.text);
        }
      });
    });
  }

  return textParts.join("\n").trim();
}

async function requestOpenAi(question, options = {}) {
  const apiKey = options.apiKey || process.env.OPENAI_API_KEY;
  const fetchImplementation = options.fetchImplementation || fetch;

  if (!apiKey) {
    const error = new Error(
      "OPENAI_API_KEY tanimli degil. DERS-09.md dosyasindaki kurulumu yapin."
    );
    error.statusCode = 503;
    throw error;
  }

  const apiResponse = await fetchImplementation(
    "https://api.openai.com/v1/responses",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        instructions:
          "Turkce cevap veren sabirli bir yazilim egitmenisin. " +
          "Cevabi baslangic seviyesine uygun, kisa ve somut tut.",
        input: question,
        max_output_tokens: 400,
      }),
    }
  );

  const data = await apiResponse.json();

  if (!apiResponse.ok) {
    let message =
      data.error && data.error.message
        ? data.error.message
        : `OpenAI API hatasi: ${apiResponse.status}`;

    if (apiResponse.status === 401) {
      message =
        "API anahtari gecersiz. Yeni bir anahtar olusturup tekrar kaydedin.";
    } else if (apiResponse.status === 429) {
      message =
        "OpenAI API kotasi veya bakiyesi yetersiz. Platform Billing " +
        "sayfasindan API kredi ve kullanim limitlerini kontrol edin.";
    } else if (apiResponse.status === 404) {
      message =
        "Secilen modele erisim yok. OPENAI_MODEL ayarini kontrol edin.";
    } else if (apiResponse.status >= 500) {
      message =
        "OpenAI servisi gecici olarak yanit veremiyor. Biraz sonra deneyin.";
    }

    const error = new Error(message);
    error.statusCode = apiResponse.status;
    throw error;
  }

  const answer = extractAnswer(data);

  if (answer === "") {
    const error = new Error("Yapay zeka bos cevap dondurdu.");
    error.statusCode = 502;
    throw error;
  }

  return answer;
}

async function handleAssistantRequest(request, response, options) {
  try {
    const body = await readJsonBody(request);
    const question =
      typeof body.question === "string" ? body.question.trim() : "";

    if (question === "") {
      sendJson(response, 400, {
        message: "Lutfen bir soru yazin.",
      });
      return;
    }

    if (question.length > 1000) {
      sendJson(response, 400, {
        message: "Soru en fazla 1000 karakter olabilir.",
      });
      return;
    }

    const answer = await requestOpenAi(question, options);
    sendJson(response, 200, {
      answer,
      model,
    });
  } catch (error) {
    sendJson(response, error.statusCode || 500, {
      message: error.message || "Beklenmeyen sunucu hatasi.",
    });
  }
}

function serveStaticFile(request, response) {
  const requestPath = request.url === "/" ? "/index.html" : request.url;
  const cleanPath = decodeURIComponent(requestPath.split("?")[0]);
  const filePath = path.resolve(publicDirectory, `.${cleanPath}`);

  if (!filePath.startsWith(publicDirectory + path.sep)) {
    sendJson(response, 403, { message: "Erisim reddedildi." });
    return;
  }

  fs.readFile(filePath, function (error, fileContent) {
    if (error) {
      sendJson(response, error.code === "ENOENT" ? 404 : 500, {
        message: "Dosya bulunamadi.",
      });
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    const headers = {
      "Content-Type":
        contentTypes[extension] || "application/octet-stream",
    };

    if (cleanPath === "/sw.js") {
      headers["Cache-Control"] = "no-cache";
      headers["Service-Worker-Allowed"] = "/";
    }

    response.writeHead(200, headers);
    response.end(fileContent);
  });
}

function createServer(options = {}) {
  return http.createServer(function (request, response) {
    if (request.method === "POST" && request.url === "/api/assistant") {
      handleAssistantRequest(request, response, options);
      return;
    }

    if (request.method === "GET") {
      serveStaticFile(request, response);
      return;
    }

    sendJson(response, 405, { message: "Bu HTTP yontemi desteklenmiyor." });
  });
}

if (require.main === module) {
  const server = createServer();
  server.listen(port, "127.0.0.1", function () {
    console.log(`Sunucu hazir: http://127.0.0.1:${port}`);
  });
}

module.exports = {
  createServer,
  extractAnswer,
  requestOpenAi,
};
