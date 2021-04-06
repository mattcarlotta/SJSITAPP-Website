import * as React from "react";
import Head from "~components/Navigation/Header";
import Center from "~components/Layout/Center";
import Paragraph from "~components/Layout/Paragraph";
import Title from "~components/Layout/Title";

export type TFormTitleProps = {
  description?: string;
  header: string;
  title: string;
};

const FormTitle = ({
  description,
  header,
  title
}: TFormTitleProps): JSX.Element => (
  <>
    <Head title={header} />
    <Center style={{ borderBottom: "1px solid #e8edf2", marginBottom: "25px" }}>
      <Title color="#010404" margin="0 0 5px 0">
        {title}
      </Title>
      <Paragraph style={{ color: "#010404" }}>{description}</Paragraph>
    </Center>
  </>
);

export default FormTitle;
