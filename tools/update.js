import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scripts = [
  {
    name: "Excelの情報を更新・新規登録",
    file: "importExcel.js",
  },
  {
    name: "不足しているカード画像をダウンロード",
    file: "downloadImages.js",
  },
];

for (const script of scripts) {
  console.log(`\n========== ${script.name} ==========\n`);

  const scriptPath = path.join(__dirname, script.file);

  const result = spawnSync(process.execPath, [scriptPath], {
    stdio: "inherit",
  });

  if (result.error) {
    console.error(`実行エラー: ${result.error.message}`);
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error(`${script.name} に失敗しました。`);
    process.exit(result.status ?? 1);
  }
}

console.log("\nすべての更新処理が完了しました！");
