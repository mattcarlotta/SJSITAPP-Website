import * as React from "react";
import Head from "~components/Navigation/Header";
import Center from "~components/Layout/Center";
import Paragraph from "~components/Layout/Paragraph";
import Title from "~components/Layout/Title";

export interface IFormTitleProps {
  description: string;
  header: string;
  title: string;
}

const FormTitle = ({
  description,
  header,
  title
}: IFormTitleProps): JSX.Element => (
  <>
    <Head title={header} />
    <Center style={{ borderBottom: "1px solid #e8edf2", marginBottom: "25px" }}>
      <Title style={{ color: "#025f6d" }}>{title}</Title>
      <Paragraph style={{ color: "#69727d" }}>{description}</Paragraph>
    </Center>
  </>
);

export default FormTitle;
