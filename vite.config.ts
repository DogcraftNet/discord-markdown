import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        target: "esnext",
        minify: "terser",
        lib: {
            entry: path.resolve(__dirname, "src/main.ts"),
            name: "discord-markdown",
            // the proper extensions will be added
            fileName: "discord-markdown"
        }
    }
});
