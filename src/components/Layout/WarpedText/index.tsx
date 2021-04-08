/* eslint-disable react/no-array-index-key */
import styled from "@emotion/styled";

const WarpedTextComponent = ({
  className
}: {
  className?: string;
}): JSX.Element => (
  <div className={className}>
    {[
      "S",
      "a",
      "n",
      "",
      "J",
      "o",
      "s",
      "e",
      " ",
      "S",
      "h",
      "a",
      "r",
      "k",
      "s",
      " ",
      "I",
      "c",
      "e",
      " ",
      "T",
      "e",
      "a",
      "m"
    ].map((letter, i) => (
      <span className={`w${i}`} key={`w${i}`}>
        {letter}
      </span>
    ))}
  </div>
);

const WarpedText = styled(WarpedTextComponent)`
  position: relative;
  display: block;
  width: 200px;
  height: 200px;

  span {
    display: block;
    position: absolute;
    transform-origin: 50% 100%;
    font-size: 14px;
    height: 11px;
    color: #fff;
    line-height: 4.2;
    white-space: pre;
    overflow: visible;
    padding: 0px;
  }

  .w0 {
    transform: rotate(4.71rad);
    width: 11px;
    left: 25.5px;
    top: 88.49px;
  }

  .w1 {
    transform: rotate(4.99rad);
    width: 9px;
    left: 29.23px;
    top: 69.75px;
  }

  .w2 {
    transform: rotate(5.26rad);
    width: 10px;
    left: 36.2px;
    top: 52.89px;
  }

  .w3 {
    transform: rotate(5.5rad);
    width: 5px;
    left: 48.92px;
    top: 39.99px;
  }

  .w4 {
    transform: rotate(5.72rad);
    width: 8px;
    left: 59.56px;
    top: 30.4px;
  }

  .w5 {
    transform: rotate(5.98rad);
    width: 10px;
    left: 74.91px;
    top: 22.98px;
  }

  .w6 {
    transform: rotate(6.24rad);
    width: 8px;
    left: 93.61px;
    top: 20.04px;
  }

  .w7 {
    transform: rotate(6.5rad);
    width: 9px;
    left: 110.49px;
    top: 21.64px;
  }

  .w8 {
    transform: rotate(6.73rad);
    width: 5px;
    left: 127.57px;
    top: 26.89px;
  }

  .w9 {
    transform: rotate(6.98rad);
    width: 11px;
    left: 138.8px;
    top: 36.1px;
  }

  .w10 {
    transform: rotate(7.26rad);
    width: 10px;
    left: 152.3px;
    top: 50.56px;
  }

  .w11 {
    transform: rotate(7.53rad);
    width: 9px;
    left: 160.93px;
    top: 67.11px;
  }

  .w12 {
    transform: rotate(7.77rad);
    width: 7px;
    left: 165.29px;
    top: 83.73px;
  }

  .w13 {
    transform: rotate(8.03rad);
    width: 10px;
    left: 162.91px;
    top: 101.16px;
  }

  .w14 {
    transform: rotate(8.29rad);
    width: 8px;
    left: 158.48px;
    top: 118.27px;
  }

  .w15 {
    transform: rotate(8.51rad);
    width: 5px;
    left: 151.89px;
    top: 131.45px;
  }

  .w16 {
    transform: rotate(8.73rad);
    width: 7px;
    left: 140.45px;
    top: 142.18px;
  }

  .w17 {
    transform: rotate(8.98rad);
    width: 9px;
    left: 125.15px;
    top: 151.3px;
  }

  .w18 {
    transform: rotate(9.24rad);
    width: 9px;
    left: 108.08px;
    top: 156.84px;
  }

  .w19 {
    transform: rotate(9.47rad);
    width: 5px;
    left: 94.15px;
    top: 157.91px;
  }

  .w20 {
    transform: rotate(9.72rad);
    width: 12px;
    left: 73.47px;
    top: 154.87px;
  }

  .w21 {
    transform: rotate(10rad);
    width: 9px;
    left: 57.41px;
    top: 146.53px;
  }

  .w22 {
    transform: rotate(10.27rad);
    width: 9px;
    left: 43.86px;
    top: 134.76px;
  }

  .w23 {
    transform: rotate(10.58rad);
    width: 16px;
    left: 28.81px;
    top: 116.73px;
  }

  .w24 {
    transform: rotate(-10.93rad);
    width: 10px;
    height: 24px;
    left: 342.55px;
    top: 198.92px;
  }

  .w25 {
    transform: rotate(-10.8rad);
    width: 25px;
    height: 24px;
    left: 332.08px;
    top: 221.01px;
  }

  .w26 {
    transform: rotate(-10.65rad);
    width: 11px;
    height: 24px;
    left: 332.82px;
    top: 243.2px;
  }

  .w27 {
    transform: rotate(-10.54rad);
    width: 11px;
    height: 24px;
    left: 326.47px;
    top: 257.94px;
  }

  .w28 {
    transform: rotate(-10.4rad);
    width: 17px;
    height: 24px;
    left: 313.61px;
    top: 274.71px;
  }

  .w29 {
    transform: rotate(-10.24rad);
    width: 19px;
    height: 24px;
    left: 298.28px;
    top: 292.38px;
  }

  .w30 {
    transform: rotate(-10.11rad);
    width: 10px;
    height: 24px;
    left: 288.31px;
    top: 305.65px;
  }

  .w31 {
    transform: rotate(-9.99rad);
    width: 16px;
    height: 24px;
    left: 270.9px;
    top: 315.87px;
  }

  .w32 {
    transform: rotate(-9.8rad);
    width: 36px;
    height: 24px;
    left: 232.66px;
    top: 329.93px;
  }

  .w33 {
    transform: rotate(-9.62rad);
    width: 17px;
    height: 24px;
    left: 212.67px;
    top: 338.35px;
  }

  .w34 {
    transform: rotate(-9.51rad);
    width: 13px;
    height: 24px;
    left: 194.41px;
    top: 341.08px;
  }

  .w35 {
    transform: rotate(-9.39rad);
    width: 19px;
    height: 24px;
    left: 170.11px;
    top: 341.45px;
  }

  .w36 {
    transform: rotate(-9.28rad);
    width: 10px;
    height: 24px;
    left: 155.35px;
    top: 339.56px;
  }

  .w37 {
    transform: rotate(-9.18rad);
    width: 11px;
    height: 24px;
    left: 139.6px;
    top: 336.48px;
  }

  .w38 {
    transform: rotate(-9.09rad);
    width: 11px;
    height: 24px;
    left: 124.8px;
    top: 331.98px;
  }

  .w39 {
    transform: rotate(-8.97rad);
    width: 13px;
    height: 24px;
    left: 107.98px;
    top: 325.3px;
  }

  .w40 {
    transform: rotate(-8.83rad);
    width: 16px;
    height: 24px;
    left: 89.36px;
    top: 315.35px;
  }
`;

export default WarpedText;
