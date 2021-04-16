import { Component, createRef, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { FormHandles } from '@unform/core';

type FoodType = {
  id: number;
  name: string;
  image: string;
  description:string;
  price : string;
  available : boolean;
}

interface FoodSubmitData {
  name: string;
  image: string;
  price: string;
  description : string;
}

interface ModalEditFoodProps {
  isOpen : boolean;
  setIsOpen : () => void;
  handleUpdateFood : (data : Omit<FoodSubmitData, 'id' | 'available'>) => void;
  editingFood : FoodType
}

interface IEditFoodData {
  name: string;
  image: string;
  price: string;
  description: string;
}

const ModalEditFood = ({isOpen,editingFood,handleUpdateFood,setIsOpen}:ModalEditFoodProps) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = async (data : IEditFoodData) => {

    handleUpdateFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );

}
/* 
class ModalEditFood extends Component {
   constructor(props) {
    super(props);

    this.formRef = createRef()
  } */

  /* handleSubmit = async (data) => {
    const { setIsOpen, handleUpdateFood } = this.props;

    handleUpdateFood(data);
    setIsOpen();
  }; 

  render() {
    const { isOpen, setIsOpen, editingFood } = this.props;

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={this.formRef} onSubmit={this.handleSubmit} initialData={editingFood}>
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  }
}; */

export default ModalEditFood;
