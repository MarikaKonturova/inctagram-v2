import path from 'path'

export default {
    // Автоматически очищайте фиктивные вызовы, экземпляры, контексты и результаты перед каждым тестом
    clearMocks: true,
    // Тестовая среда, которая будет использоваться для тестирования
    testEnvironment: 'jsdom',
    // Пути, которые будут проигнорированы при сборе покрытия
    coveragePathIgnorePatterns: [
        '\\\\node_modules\\\\'
    ],
    // Директории, которые Jest будет искать вместе с node_modules
    moduleDirectories: [
        'node_modules'
    ],
    modulePaths: [
        '<rootDir>src'
    ],
    // Расширения файлов, которые Jest будет искать в модулях
    moduleFileExtensions: [
        'js',
        'jsx',
        'ts',
        'tsx',
        'json',
        'node'
    ],
    // Корневая директория, в которой Jest будет искать файлы
    rootDir: '../../',
    // Шаблоны паттернов, которые Jest использует для обнаружения тестовых файл
    testMatch: [
    // эта регулярка должна работать везде
        '<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)'
    ],
    setupFilesAfterEnv: ['<rootDir>config/jest/jest.setup.ts'],
    moduleNameMapper: {
        '\\.s?css$': 'identity-obj-proxy',
        '\\.svg': '<rootDir>/src/shared/config/jest/ui/jestEmptyComponent.tsx',
        '^.+\\.(jpg|jpeg|png|gif|webp|avif)$':
        path.resolve(__dirname, 'fileMock.js'),
        axios: 'axios/dist/node/axios.cjs'
    },

    transformIgnorePatterns: [
        // 'node_modules/(?!axios)',
        '/node_modules/',
        '^.+\\.module\\.(css|sass|scss)$'
    ],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
    transform: {
        '^.+\\.m?(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]

    }
}
