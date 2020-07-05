/* eslint-disable no-catch-shadow */
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Keyboard} from 'react-native';
import {Title, Form, Input, Submit, List} from './styles';
import Layout from '~/components/Layout';
import Repository from '~/components/Repository';
import {useSelector} from 'react-redux';
import respositoryService from '~/services/providers/repositoryService';

const Main = () => {
  const [input, setInput] = useState('');
  const respositories = useSelector((state) => state.repository.repository);
  // const [error, setError] = useState(false);

  async function handleAddRepository() {
    respositoryService.add(input);
    setInput('');
    Keyboard.dismiss();
  }

  return (
    <Layout>
      <Title> Repositórios </Title>
      <Form>
        <Input
          value={input}
          onChangeText={setInput}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Procurar respositorio"
        />
        <Submit onPress={handleAddRepository}>
          <Icon name="add" size={22} color="#FFF" />
        </Submit>
      </Form>
      <List
        keybourdShouldPresistTaps="handled"
        data={respositories}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => <Repository data={item} />}
      />
    </Layout>
  );
};

export default Main;
