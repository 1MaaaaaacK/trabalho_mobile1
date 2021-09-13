import React, {useEffect, useState} from 'react';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../components/button/Button';
import { SkillCard } from '../components/skillCards/SkillCard';
import { Container, Input, Title } from './styles';

interface RegistrationInterface {
    id: string;
    infos: string[];
}

export function Home() {
    const [registrationLocal, setRegistrationLocal] = useState({name: '', email: '', telefone: ''})
    const [registrarionArray, setRegistrarionArray] = useState<RegistrationInterface[]>([])
    
    function addNewRegistration(){
        if(Object.values(registrationLocal).find(m => m == '') == ''){
            return;
        }
        const data = {
            id: String(new Date().getTime()),
            infos: [registrationLocal.name, registrationLocal.email, registrationLocal.telefone]
        }
          
        setRegistrarionArray([...registrarionArray, data])
        setRegistrationLocal({name: '', email: '', telefone: ''})
        
    
    }  

    function RemoveRegistration(id: string) {
        setRegistrarionArray(registrarionArray.filter(skill => skill.id !== id))
    }

    useEffect(() => {
        async function loadData() {
            const registrations = await AsyncStorage.getItem('@registrations')

            if(registrations){
                setRegistrarionArray(JSON.parse(registrations))
            }
        }
        loadData()

    }, [])

    useEffect(() => {
        async function saveData() {
            await AsyncStorage.setItem('@registrations', JSON.stringify(registrarionArray))
        }
        saveData()
    }, [registrarionArray])

  return (
    <>
    <Container>
   
        <Title>Painel de Registro</Title>

        <Input 
        placeholder='Nome' 
        placeholderTextColor='#555'
        value={registrationLocal.name}
        onChangeText={values =>setRegistrationLocal({...registrationLocal, name: values})}
        />
         <Input 
        placeholder='Email' 
        placeholderTextColor='#555'
        value={registrationLocal.email}
        onChangeText={values =>setRegistrationLocal({...registrationLocal, email: values})}
        />
         <Input 
        placeholder='Telefone' 
        placeholderTextColor='#555'
        value={registrationLocal.telefone}
        onChangeText={values =>setRegistrationLocal({...registrationLocal, telefone: values})}
        />
 
        <Button  
            title='ADD' 
            onPress={addNewRegistration}
        />

    <Title style={{marginVertical: 20}}>
        Registros
    </Title>

      <FlatList showsVerticalScrollIndicator={false}
        data={registrarionArray}
        keyExtractor={item=> item.id}
        renderItem={({item}) => (

            <SkillCard 
            skill={item.infos}
            onLongPress={() => RemoveRegistration(item.id)}
            
            />
        )}
    />  
    
    </Container>
    </>
  );
}