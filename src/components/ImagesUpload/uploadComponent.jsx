/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import UploadService from '../../services/FileUploadService.jsx';

export default class UploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: undefined,
      previewImages: [],
      progressInfos: [],
      message: [],
      imageInfos: [],
    };

    this.selectFiles = this.selectFiles.bind(this);
    this.uploadImages = this.uploadImages.bind(this);
    this.upload = this.upload.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  selectFiles(event) {
    let images = [];

    for (let i = 0; i < event.target.files.length; i++) {
      images.push({
        blob: URL.createObjectURL(event.target.files[i]),
        name: event.target.files[0].name,
      });
    }

    this.setState({
      progressInfos: [],
      message: [],
      selectedFiles: event.target.files,
      previewImages: images,
    });
  }

  uploadImages() {
    const selectedFiles = this.state.selectedFiles;

    const progressInfos = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
    }

    this.setState(
      {
        progressInfos: progressInfos,
        message: [],
      },
      () => {
        for (let i = 0; i < selectedFiles.length; i++) {
          this.upload(i, selectedFiles[i]);
        }
      },
    );
  }

  upload(idx, file) {
    const progressInfos = [...this.state.progressInfos];

    UploadService.upload(file, (event) => {
      progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total,
      );
      this.setState({
        progressInfos: progressInfos,
      });
    })
      .then((response) => {
        if (response?.response?.success === false) {
          return this.setState((prev) => {
            const nextMessage = [
              ...prev.message,
              { errMsg: response.response.data.message },
            ];
            return {
              message: nextMessage,
              progressInfos: 0,
            };
          });
        }

        const { src } = response.data.image;
        this.setState((prev) => {
          const nextMessage = [
            ...prev.message,
            { msg: `Uploaded the image successfully: ${file.name}`, src },
          ];
          return {
            message: nextMessage,
          };
        });
      })
      .catch((err) => {
        console.log(err);
        progressInfos[idx].percentage = 0;
        this.setState((prev) => {
          const nextMessage = [
            ...prev.message,
            { errMsg: `Could not upload the image: ${file.name}` },
          ];
          return {
            progressInfos,
            message: nextMessage,
          };
        });
      });
  }

  cancel() {
    this.setState({
      selectedFiles: undefined,
      previewImages: [],
      progressInfos: [],
      message: [],
      imageInfos: [],
    });
  }

  componentDidMount() {
    UploadService.getFiles().then((response) => {
      this.setState({
        imageInfos: response.data,
      });
    });
  }

  render() {
    const { selectedFiles, previewImages, progressInfos, message } = this.state;

    return (
      <div>
        <section className="h-full overflow-auto p-8 w-full flex flex-col">
          <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
            <input
              className="flex text-center"
              type="file"
              multiple
              accept="image/*"
              onChange={this.selectFiles}
            />
          </header>

          <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
            To Upload
          </h1>

          {previewImages.length ? (
            <ul className="flex flex-1 flex-wrap -m-1">
              {previewImages.map((img, i) => {
                return (
                  <li
                    key={i}
                    className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24"
                  >
                    <article className="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm">
                      <img
                        className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
                        src={img.blob}
                        alt={'image-' + i}
                        key={i}
                      />
                      <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                        <h1 className="flex-1"></h1>
                        <div className="flex">
                          <p className="p-1 size text-xs">{img.name}</p>
                        </div>
                      </section>
                    </article>
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
              <li
                id="empty"
                className="h-full w-full text-center flex flex-col items-center justify-center"
              >
                <img
                  className="mx-auto w-32"
                  src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                  alt="no data"
                />
                <span className="text-small text-gray-500">
                  No files selected
                </span>
              </li>
            </ul>
          )}
        </section>

        <footer className="flex justify-end px-8 pb-8 pt-4">
          <button
            className="hover:cursor-pointer rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
            disabled={!selectedFiles}
            onClick={this.uploadImages}
          >
            Upload now
          </button>
          <button
            onClick={this.cancel}
            className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
          >
            Cancel
          </button>
        </footer>

        {progressInfos.length ? (
          <div className="m-2">
            <div>Upload Information</div>
            {progressInfos.map((progressInfo, i) => (
              <div className="m-1" key={i}>
                <span>
                  {progressInfo.fileName} - Uploaded {progressInfo.percentage}%
                </span>
                <div className="w-full bg-gray-200 h-1">
                  <div
                    className="bg-blue-600 h-1"
                    style={{ width: progressInfo.percentage + '%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ''
        )}

        {message.length > 0 && (
          <div className="m-1 mt-5 mb-5" role="alert">
            <ul>
              {message.map((item, i) => {
                if (item.errMsg) {
                  return <li key={i}>{item.errMsg}</li>;
                }

                return (
                  <li key={i}>
                    {item.msg}{' '}
                    <a className="font-bold" href={item.src}>
                      Click to view it
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="text-center text-xl m-5">
          <Link to="/">Go back to gallery</Link>
        </div>
      </div>
    );
  }
}
