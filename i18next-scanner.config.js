const path = require('path');
const fs = require('fs');
const typescript = require('typescript');

module.exports = {
    input: ['src/**/*.{ts,tsx}', '!src/**/*.spec.{ts,tsx}', '!src/locales/**', '!**/node_modules/**', 'src/**/*.d.ts'],
    output: './',
    options: {
        func: {
            list: ['i18next.t', 'i18n.t', 't'],
            extensions: ['.js', '.jsx']
        },
        trans: {
            component: 'Trans',
            i18nKey: 'i18nKey',
            defaultsKey: 'defaults',
            extensions: ['.js', '.jsx'],
            fallbackKey: function (ns, value) {
                return value;
            },
            acorn: {
                ecmaVersion: 2020,
                sourceType: 'module' // defaults to 'module'
            }
        },
        lngs: ['en'],
        ns: ['common'],
        defaultLng: 'en',
        defaultNs: 'common',
        defaultValue: '__STRING_NOT_TRANSLATED__',
        resource: {
            loadPath: 'src/locales/{{lng}}/{{ns}}.json',
            savePath: 'src/locales/{{lng}}/{{ns}}.json',
            jsonIndent: 2,
            lineEnding: '\n'
        },
        nsSeparator: ':', // namespace separator
        keySeparator: '.', // key separator
        interpolation: {
            prefix: '{{',
            suffix: '}}'
        }
    },
    transform: function typescriptTransform(file, enc, done) {
        const options = {
            tsOptions: {
                target: 'esnext'
            },
            extensions: ['.ts', '.tsx']
        };
        const { base, ext } = path.parse(file.path);

        if (options.extensions.includes(ext) && !base.includes('.d.ts')) {
            const content = fs.readFileSync(file.path, enc);

            const { outputText } = typescript.transpileModule(content, {
                compilerOptions: options.tsOptions,
                fileName: path.basename(file.path)
            });

            this.parser.parseTransFromString(outputText);
            this.parser.parseFuncFromString(outputText);
        }

        done();
    }
};
