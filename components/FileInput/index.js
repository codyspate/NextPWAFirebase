import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

class FileInput extends Component {
  state = {
    files: []
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

  handlerOnDragOver = event => {
    event.preventDefault();
  };

  hasExtension = (name) => new RegExp('(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$', 'i').test(name);

  handlerOnDrop = event => {
    /*
    * Prevent add repeat files to state and check the extension
    * Add Files to State
    */
    event.preventDefault();

    const array_files = [];
    const { hasExtension } = this

    for (let i = 0; i < event.dataTransfer.files.length; i++) {
      let file = event.dataTransfer.files[i];
      if (!this.state.files.map((n) => n.name).includes(file.name) && hasExtension(file.name)) {
        array_files.push(file);
      }
    }

    this.setState({
      files: [...this.state.files, ...array_files]
    });
  };

  removeFile = (index) => {
    this.setState({
      files: this.state.files.filter((_, i) => i !== index)
    });
  };

  onUploadClick(e) {
    e.target.value = null;
  }

  /*
  On button click, trigger input file to open
  */
  triggerFileUpload = () => this.refInputFile.current.click();

  /*
  Handle file validation for a single file
  */
  onUploadSingleFile = (e) => {
    const singleFile = e.target.files[0];

    console.log(singleFile)

    this.setState({
      files: [...this.state.files, ...[singleFile]],
    });
  }

  /*
  Handle file validation for severals files
  */
  onUploadSeveralFiles = (e) => {
    const files = e.target.files;
    const array_files = [];

    // Iterate over all uploaded files
    for (let i = 0; i < files.length; i++) {
      let singleFile = files[i];
      // Prevent upload repeat file
      if (!this.state.files.map((n) => n.name).includes(singleFile.name)) {
        array_files.push(singleFile);
      }
    }

    this.setState({
      files: [...this.state.files, ...array_files]
    });
  }

  render() {
    const { triggerFileUpload, onUploadSingleFile, onUploadSeveralFiles, onUploadClick } = this

    const { accept, name, singleImage, onChange } = this.props

    return (
      <div
        className="FileInput"
        onDragOver={this.handlerOnDragOver}
        onDrop={this.handlerOnDrop}
      >
        <div>
          <p>Drag & Drop</p>
          <p>or</p>
          <div>
            <Button
              blue
              type='button'
              onClick={triggerFileUpload}
            >
              Browse
            </Button>
            <input
              type="file"
              name={name}
              ref={this.refInputFile}
              multiple={singleImage}
              onChange={singleImage ? onUploadSingleFile : onUploadSeveralFiles}
              onClick={onUploadClick}
              accept={accept}
              hidden
            />
          </div>
        </div>
        <style jsx>{`
          .FileInput {
            border: dashed 2px white;
            width: 219px;
            height: 160px;
            display: flex;
            justify-content: center;
            align-items: center
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