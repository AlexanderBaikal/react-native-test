import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function HamburgerIcon(props) {
  return (
    <Svg
      className="prefix__MuiSvgIcon-root prefix__jss81"
      viewBox="0 0 24 24"
      width={40}
      height={40}
      aria-hidden="true"
      fill={'black'}
      {...props}>
      <Path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </Svg>
  );
}

export default HamburgerIcon;
