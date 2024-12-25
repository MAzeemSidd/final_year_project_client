import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

export default function ChangeThemeBtn({navigation}) {
  const { primaryColor, textPrimaryColor, textSecondaryColor } = useSelector(state => state.themeColor)

  return (
    <Container colors={{primaryColor, textPrimaryColor}} onPress={() => navigation.navigate('ColorTheme')}>
        <Title textSecondaryColor={textSecondaryColor}>Change App Theme</Title>
        <AntDesign name="rightcircleo" size={20} color={textSecondaryColor} />
    </Container>
  )
}


const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 45;
  width: 100%;
  marginTop: 10;
  padding: 0px 20px;
  background-color: ${props => props.colors.primaryColor};
  border-radius: 5;
  border-width: ${0.3};
  border-color: ${props => props.colors.textPrimaryColor};
  shadow-color: ${props => props.colors.textPrimaryColor};
  elevation: 15;
`;

const Title = styled.Text`
  font-size: 14;
  font-weight: bold;
  font-family: sans-serif;
  color: ${props => props.textSecondaryColor};
`;