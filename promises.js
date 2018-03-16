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
      c(`Promise: ${obj.value}, ${obj.result}`)
      return cuadrado(4)
    })
    .then(obj => {
      c(`Promise: ${obj.value}, ${obj.result}`)
      return cuadrado(6)
    })
    .then(obj => {
      c(`Promise: ${obj.value}, ${obj.result}`)
      c('Fin de Promise')
    })
    .catch(err => c(err))
})(console.log);
