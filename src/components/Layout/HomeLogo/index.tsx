import styled from "@emotion/styled";

const HomeLogoComponent = ({ className }: { className?: string }) => (
  <img
    className={className}
    src="/images/staticIceTeamLogo.jpg"
    alt="StaticIceTeamLogo.png"
  />
);

const HomeLogo = styled(HomeLogoComponent)`
  @media (max-width: 650px) {
    max-width: 250px;
  }

  display: block;
  margin: 0 auto;
  max-width: 40vw;
`;

export default HomeLogo;
