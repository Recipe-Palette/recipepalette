/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

const ImageDropZone = ({ handleImageDrop, image_url, name }) => {
  const [file, setFile] = useState(null)
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const acceptedFile = acceptedFiles[0]
      handleImageDrop(acceptedFile)
      setFile({ ...acceptedFile, preview: URL.createObjectURL(acceptedFile) })
    },
    multiple: false,
  })

  const src = file ? file.preview : image_url
  const alt = file ? file.name : name

  const thumb =
    src.length > 0 ? (
      <div
        sx={{
          display: `flex`,
          justifyContent: `center`,
          p: `3`,
          maxHeight: ``,
        }}
      >
        <img
          src={src}
          alt={alt}
          sx={{
            maxWidth: `100%`,
            maxHeight: [`400px`, `auto`],
          }}
        />
      </div>
    ) : null

  return (
    <div
      sx={{
        display: `flex`,
        flexDirection: `column`,
        mt: `4`,
        backgroundColor: `#fafafa`,
        '& > p': {
          fontSize: `1rem`,
        },

        '& > em': {
          fontSize: `.8rem`,
        },
      }}
    >
      <div
        {...getRootProps({ className: 'dropzone' })}
        sx={{
          flex: 1,
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          padding: `20px`,
          borderWidth: `2px`,
          borderRadius: `2px`,
          borderColor: `#eeeeee`,
          borderStyle: `dashed`,
          backgroundColor: `#fafafa`,
          color: `#bdbdbd`,
          outline: `none`,
          transition: `border .24s ease-in-out`,

          '&:focus': {
            borderColor: `#2196f3`,
          },
        }}
      >
        <input {...getInputProps()} />
        <p sx={{ mb: `0` }}>
          Drag 'n' drop an image here, or click to select an image
        </p>
      </div>
      <div
        sx={{
          display: `flex`,
          justifyContent: `center`,
          borderColor: `#eeeeee`,
          borderStyle: `solid`,
          borderWidth: src ? `2px` : `0px`,
          borderTop: `none`,
        }}
      >
        {thumb}
      </div>
    </div>
  )
}

export default ImageDropZone
