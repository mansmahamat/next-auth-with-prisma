const cloudinary = require("cloudinary").v2

cloudinary.config({
  cloud_name: "mansdesmez",
  api_key: "318321927792211",
  api_secret: "je9hSnY8_brgN7vLlMvEMvYSXzE",
})

export function uploadImage(imageUploaded) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      imageUploaded,
      // { width: 400, height: 300, crop: "fill" },
      (err, res) => {
        if (err) reject(err)
        resolve(res)
      }
    )
  })
}
