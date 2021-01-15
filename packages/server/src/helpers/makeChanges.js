const fs = require('fs')
const path = require('path')

const makeChanges = (data) => {
  const filePath = path.join(__dirname, '..', 'data.json')
  const writeData = JSON.stringify(data)

  fs.writeFile(filePath, writeData, (err) => {
    if (err) console.log(err)
  })
}

module.exports = {
  makeChanges
}
