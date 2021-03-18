import * as React from "react";
import { FaCopyright } from "~icons";
import Card from "~components/Layout/Card";
import InfoText from "~components/Layout/InfoText";
import Line from "~components/Layout/Line";
import Padding from "~components/Layout/Padding";
import Title from "~components/Layout/Title";
import Head from "~components/Navigation/Header";
import { fullyearFormat } from "~utils/dateFormats";
import moment from "~utils/momentWithTimezone";

const LicensingPage = (): JSX.Element => (
  <>
    <Head title="Licensing" url="/employee/licensing" />
    <Card
      dataTestId="licensing-page"
      title="Licensing"
      icon={<FaCopyright />}
      subtitle="Information regarding Licensing"
    >
      <Padding right="30px" bottom="30px" left="30px">
        <Title>Licensing</Title>
        <Line style={{ marginBottom: 10 }} />
        <InfoText>MIT License</InfoText>
        <br />
        <br />
        <InfoText>
          Copyright (c) 2019-{moment().format(fullyearFormat)} Matt Carlotta
        </InfoText>
        <br />
        <br />
        <InfoText>
          Permission is hereby granted, free of charge, to any person obtaining
          a copy of this software and associated documentation files (the
          &#34;Software&#34;), to deal in the Software without restriction,
          including without limitation the rights to use, copy, modify, merge,
          publish, distribute, sublicense, and/or sell copies of the Software,
          and to permit persons to whom the Software is furnished to do so,
          subject to the following conditions:
        </InfoText>
        <br />
        <br />
        <InfoText>
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
        </InfoText>
        <br />
        <br />
        <InfoText>
          THE SOFTWARE IS PROVIDED &#34;AS IS&#34;, WITHOUT WARRANTY OF ANY
          KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
          OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
          NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
          LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
          OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
          WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </InfoText>
      </Padding>
    </Card>
  </>
);

export default LicensingPage;
