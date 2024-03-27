module.exports = {
  //bail executa os testes em x vezes, se passar esse valor ele para a operação e lança um erro
  bail: true,
  coverageProvider: "v8",
  testMatch: [
    "<rootDir>/src/**/*.spec.js"
  ],
}