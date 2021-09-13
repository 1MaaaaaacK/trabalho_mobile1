import React from "react";
import { TouchableOpacityProps } from "react-native";
import { ButtonSkill, ButtonText } from "./styles";

interface SkillCardProps extends TouchableOpacityProps{
    skill: any[]
}

export function SkillCard({skill, ...rest}:SkillCardProps) {
   //console.log(skill)
    return(
        
    <ButtonSkill 
    {...rest}
    >
       
        <ButtonText style={{fontSize: 25}}>{skill[0]}</ButtonText>
       
        <ButtonText style={{fontSize: 15}}>{'Email: ' + skill[1]}</ButtonText>
        <ButtonText style={{marginBottom: 0, fontSize: 13}}>{'Telefone: ' + skill[2]}</ButtonText>
    
    </ButtonSkill>
    )
}