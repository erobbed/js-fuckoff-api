document.addEventListener("DOMContentLoaded", function() {
    getRandomOperation(setFields)

    let fuckoffForm = document.getElementById("fuckoff-form")
    fuckoffForm.addEventListener("submit", function(event){
        event.preventDefault()

        let values = []

        let urlField = document.getElementById("url")
        let userFields = document.getElementById("userfields")
        for (let i = 0; i < userFields.children.length; ++i){
            let inputField = userFields.children[i].children[1]
            values.push({name: inputField.name, value: inputField.value})
        }
        getFuckOff(urlField.value, values)
        getRandomOperation(setFields)
    })
})

  function getRandomOperation(callback){
    let url = "http://foaas.com/operations"

    fetch(url, {
        headers: {
            Accept: "application/json"
        }
    })
    .then(res => res.json())
    .then(json => selectOperation(json, callback))
  }

  let undesiredOperations = ["Version"]

  function selectOperation(operations, callback){
    let allowedOperations = operations.filter(operation => undesiredOperations.indexOf(operation.name) == -1)
    let index = Math.floor(Math.random() * allowedOperations.length)

    callback(allowedOperations[index])
  }

  function setFields(operation){
    let html = operation.fields.map(field => buildField(field)).join('')
    let userFields = document.getElementById("userfields")
    userFields.innerHTML = html

    let operationField = document.getElementById("operation")
    operationField.value = operation.name

    let urlField = document.getElementById("url")
    urlField.value = operation.url
  }

  function buildField(field){
    return `<div><label for='${field.field}'>${field.name}:</label>
    <input type='text' name='${field.field}' placeholder='${field.name}' /><br/></div>`
  }

  function getFuckOff(url, values){
    values.forEach(function(v){
        url = url.replace(`:${v.name}`, v.value)
    })

    let finalUrl = `http://foaas.com${url}`
    fetch(finalUrl, {
        headers: {
            Accept: "application/json"
        }
    })
    .then(res => res.json())
    .then(json => printMessage(json))
  }

  function printMessage(result){
    let fuckoffContainer = document.getElementById("fuckoff-container")
    fuckoffContainer.innerHTML = `<h1>${result.message}</h1><p><em>${result.subtitle}</em></p>`
  }

  function resetForm(){

  }
