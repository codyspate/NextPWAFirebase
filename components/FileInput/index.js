import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

class FileInput extends Component {
  state = {
    file: null,
    picture: null
  }

  refInputFile = React.createRef()

  static propTypes = {
    accept: PropTypes.string,
    name: PropTypes.string.isRequired,
    singleImage: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    imgExtension: PropTypes.array
  }

  static defaultProps = {
    accept: "image/*",
    name: "",
    singleImage: true,
    onChange: () => { },
    imgExtension: ['.jpg', '.jpeg', '.gif', '.png']
  }

  handlerOnDragOver = event => event.preventDefault()

  hasExtension = (name) => new RegExp('(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$', 'i').test(name)

  handlerOnDrop = event => {
    event.preventDefault();

    this.onUploadSingleFile({
      target: {
        files: [event.dataTransfer.files[0]]
      }
    })
  };

  handleClear = () => {
    this.setState({
      file: null,
      picture: null
    });

    this.props.onChange(null, null);
  };

  onUploadClick = event => event.target.value = null;

  /*
  On button click, trigger input file to open
  */
  triggerFileUpload = () => this.refInputFile.current.click();

  /*
  Handle file validation for a single file
  */
  onUploadSingleFile = (e) => {
    const singleFile = e.target.files[0];

    this.readFile(singleFile).then(newFileData => {
      this.setState({ picture: newFileData.dataURL, file: newFileData.file }, () => {
        this.props.onChange(this.state.picture, this.state.file);
      });
    });
  }


  readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Read the image via FileReader API and save image result in state.
      reader.onload = function (e) {
        // Add the file name to the data URL
        let dataURL = e.target.result;
        dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
        resolve({ file, dataURL });
      };

      reader.readAsDataURL(file);
    });
  }

  render() {
    const {
      triggerFileUpload,
      handlerOnDrop,
      handlerOnDragOver,
      onUploadSingleFile,
      onUploadClick,
      handleClear,
      props: {
        accept,
        name
      },
      state: {
        picture
      },
      refInputFile
    } = this

    return (
      <div
        className="FileInput"
        onDragOver={handlerOnDragOver}
        onDrop={handlerOnDrop}
        style={{
          backgroundImage: picture ? `url('${picture}')` : 'unset'
        }}
      >

        {
          !picture ? (
            <div>
              <p>Drag & Drop</p>
              <p>or</p>
              <div>
                <Button
                  type='button'
                  onClick={triggerFileUpload}
                >
                  Browse
                </Button>
                <input
                  type="file"
                  name={name}
                  ref={refInputFile}
                  multiple={false}
                  onChange={onUploadSingleFile}
                  onClick={onUploadClick}
                  accept={accept}
                  hidden
                />
              </div>
            </div>
          ) : (
              <div>
                <div>
                  <Button
                    type='button'
                    onClick={handleClear}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )
        }

        <style jsx>{`
          .FileInput {
            border: dashed 2px white;
            width: 100%;
            height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-position: center center;
            background-size: cover;
          }
          
          .FileInput > div {
            text-align: center;
          }
          
          .FileInput > div > p {
            font-size: 14px;
            color: #344653;
          }
      `}</style>
      </div>
    )
  }
}

export default FileInput