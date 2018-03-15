((c) => {
  const cuadrado = value => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({value: value, result: value*value})
      }, Math.random() * 100)
    })
  }

  cuadrado(2)
    .then(obj => {
      c('Inicio de Promise')
      c(`Callback: ${obj.value}, ${obj.result}`)
      return cuadrado(4)
    })
    .then(obj => {
      c(`Callback: ${obj.value}, ${obj.result}`)
      return cuadrado(6)
    })
    .then(obj => {
      c('Fin de Promise')
      c(`Callback: ${obj.value}, ${obj.result}`)
    })
    .catch(err => c(err))
})(console.log);
