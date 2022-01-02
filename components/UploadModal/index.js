import React, { useState } from 'react';
import {
  Button,
  Modal,
  Upload as AntUpload,
  Form,
  Input,
  notification,
} from 'antd';
import { StyledIcon, StyledImage, UploadText } from './styles';
import useFetchApi from '../../services/hooks/useFetchApi';
import { actions } from '../../services/actions';

const UploadButton = () => {
  return (
    <div>
      <StyledIcon className='uil uil-cloud-upload' />
      <UploadText>Upload</UploadText>
    </div>
  );
};

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export default function UploadModal({ visible, onCancel }) {
  const [form] = Form.useForm();
  const fetchApi = useFetchApi();
  const [imageInfo, setImageInfo] = useState();
  const [loading, setLoading] = useState(false);

  const onUploadImageChange = (info) => {
    getBase64(info.file.originFileObj, (imageUrl) => {
      setImageInfo(imageUrl);
    });
  };

  const onCancelHandler = () => {
    form.resetFields();
    setImageInfo(null);
    onCancel();
  };

  const uploadImage = (data) => {
    setLoading(true);
    fetchApi.call({
      type: actions.gallery.upload,
      params: data,
      onSuccess: () => {
        setLoading(false);
        notification.success({
          message: 'Upload image successfully',
        });
        onCancelHandler();
      },
      onFailure: (error) => {
        setLoading(false);
        console.error(error);
        notification.error({
          message: 'Unable to upload the image',
        });
      },
    });
  };

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const { name, description, image } = values;

        const originImage = image.file.originFileObj;

        uploadImage({ name, description, image: originImage });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal
      title='Upload Photo'
      width={480}
      okText='Upload'
      visible={visible}
      onOk={onSubmit}
      okButtonProps={{ loading }}
      onCancel={onCancelHandler}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          name='name'
          label='Name'
          rules={[{ required: true, message: 'Please input name of image' }]}
        >
          <Input placeholder='Name of image' />
        </Form.Item>
        <Form.Item
          name='description'
          label='Description'
          rules={[
            { required: true, message: 'Please input description of image' },
          ]}
        >
          <Input.TextArea rows={3} placeholder='Description of image' />
        </Form.Item>
        <Form.Item
          name='image'
          label='Image'
          rules={[{ required: true, message: 'Please upload the image' }]}
        >
          <AntUpload
            accept='image/*'
            listType='picture-card'
            showUploadList={false}
            onChange={onUploadImageChange}
          >
            {imageInfo ? (
              <StyledImage src={imageInfo} alt='upload-photo' />
            ) : (
              <UploadButton />
            )}
          </AntUpload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
