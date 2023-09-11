import { IncomingForm } from "formidable"

export async function getImage(req) {
  const data = await new Promise(function (resolve, reject) {
    const form = new IncomingForm({ keepExtensions: true })

    console.log("form", form)
    form.parse(req, function (err, fields, files) {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })

  return data.files.image
}
