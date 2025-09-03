const fs = require('fs');

class TextFile {
    constructor(filename) {
        this.filename = filename;
        this.writer = null;
    }

    async #getWriter() {
        if (!this.writer) {
            // Dynamic import for ESM package
            const { Writer } = await import('steno');
            this.writer = new Writer(this.filename);
        }
        return this.writer;
    }

    async read() {
        let data;
        try {
            data = await fs.promises.readFile(this.filename, 'utf-8');
        }
        catch (e) {
            if (e.code === 'ENOENT') {
                return null;
            }
            throw e;
        }
        return data;
    }

    async write(str) {
        const writer = await this.#getWriter();
        return writer.write(str);
    }
}

module.exports = { TextFile };