import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, notification } from 'antd';
import useFetchApi from '../../services/hooks/useFetchApi';
import { actions } from '../../services/actions';

export default function EditModal({ selectedPhoto, onCancel }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const fetchApi = useFetchApi();

  const onUpdatePhotoData = (id, name, description) => {
    setLoading(true);
    fetchApi.call({
      type: actions.gallery.updatePhoto,
      params: { id, name, description },
      onSuccess: (response) => {
        setLoading(false);
        notification.success({
          message: 'Update image information successfully',
        });
        form.resetFields();
        onCancel();
      },
      onFailure: (error) => {
        setLoading(false);
        console.error(error);
      },
    });
  };

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const { name, description } = values;

        onUpdatePhotoData(selectedPhoto.id, name, description);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onCancelHandler = () => {
    form.resetFields();
    onCancel();
  };

  useEffect(() => {
    if (!selectedPhoto) return;

    form.setFieldsValue({
      name: selectedPhoto?.name,
      description: selectedPhoto?.description,
    });
  }, [selectedPhoto]);

  return (
    <Modal
      title='Edit Photo'
      visible={selectedPhoto}
      okText='Update'
      onOk={onSubmit}
      onCancel={onCancelHandler}
      okButtonProps={{ loading }}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          name='name'
          label='Name'
          rules={[{ required: true, message: 'Please input the image name' }]}
        >
          <Input placeholder='Name of photo' />
        </Form.Item>
        <Form.Item
          label='Description'
          name='description'
          rules={[{ required: true, message: 'Please input the description' }]}
        >
          <Input.TextArea rows={3} placeholder='Description of photo' />
        </Form.Item>
      </Form>
    </Modal>
  );
}
