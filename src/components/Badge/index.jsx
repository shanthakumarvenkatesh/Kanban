import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';
import getCategoryBackgroundColor from '../../helpers/getCategoryBackgroundColor';

import { BadgeContainer } from './styles';

const Badge = ({ category }) => {
  const theme = useContext(ThemeContext); 

  const [color, setColor] = useState(theme.colors.primary);

  useEffect(() => {
    if (category) {
      const categoryColor = getCategoryBackgroundColor(theme, category);
      setColor(categoryColor);
    }
  }, [category, theme]);

  return ( 
    <BadgeContainer color={color}>
      <p>{category}</p>
    </BadgeContainer>
  );
}

export default Badge;
