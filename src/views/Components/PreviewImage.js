import React, { useState } from "react";
import {
  FormGroup,
  FormControl,
  FormLabel,
  Image,
  Row,
  Col,
  Button,
} from "react-bootstrap";

function FileUploadWithPreview() {
  const [previewSrc, setPreviewSrc] = useState(null); // 存储图片预览的 URL

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // 当 FileReader 读取完成，其 result 属性包含了图片的 Base64 编码的 data URL
        setPreviewSrc(reader.result);
      };
      reader.readAsDataURL(file); // 开始读取文件
    } else {
      setPreviewSrc(null); // 清除预览
    }
  };

  return (
    <div>
      <Row>
        <Col xs={12} md={6}>
          <FormGroup>
            <FormLabel>Upload Image</FormLabel>
            <FormControl
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={6}>
          {previewSrc && <Image src={previewSrc} alt="Preview" thumbnail />}
        </Col>
      </Row>
      <Button type="submit" className="mt-2">
        Submit
      </Button>
    </div>
  );
}

export default FileUploadWithPreview;
