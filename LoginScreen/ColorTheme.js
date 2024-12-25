import { useState, useEffect } from 'react'
import { View } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { changeThemeColor } from '../redux/actions_&_reducers/themeColorSlice';


export default function ColorTheme() {
    const dispatch = useDispatch();
    const [label, setLabel] = useState('Theme 1');
    const [initial, setInitial] = useState(1);

    // function changeTheme() {
    //     dispatch(changeThemeColor(theme));
    // }

    useEffect(() => {
        console.log('useEffect runs');
        console.log(`Outside Radio Btn:  ${label}`);
        if(label == 'Theme 1') return setInitial(1);
        else if(label == 'Theme 2') return setInitial(2);
    }, [label])
    
    

    const { 
        textSecondaryColor, 
        primaryColor, 
        primaryColor2, 
        secondaryColor 
    } = useSelector(state => state.themeColor)

    const themes = [
        {
            label: 'Theme 1',
            id: 1,
            theme: {
                textPrimaryColor: '#455A64',
                textSecondaryColor: '#616161',
                primaryColor: '#FFFAFF',
                primaryColor2: '#EAEAEE',
                secondaryColor: '#145792',
            }
        },
        {
            label: 'Theme 2',
            id: 2,
            theme: {
                textPrimaryColor: '#ACACAC',
                textSecondaryColor: '#C5C5C5',
                primaryColor: '#0C253A',
                primaryColor2: '#053052',
                secondaryColor: '#145792',
            }
        },
        {
            label: 'Theme 3'
        },
        {
            label: 'Theme 4'
        }
    ];



    return (
        <View>
            <RadioButtonRN
                data={themes}
                initial={initial}
                selectedBtn={(e) => {
                    console.log(`Inside Radio Btn:  ${e.label}`);
                    setLabel(e.label)
                    dispatch(changeThemeColor(e.theme));
                }}
                animationTypes={['pulse']}
                activeColor={secondaryColor}
                boxActiveBgColor={primaryColor}
                deactiveColor={textSecondaryColor}
                boxDeactiveBgColor={'lightgrey'}
            />
        </View>
    )
}
