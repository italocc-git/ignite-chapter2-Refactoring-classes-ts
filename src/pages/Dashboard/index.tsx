import {  useEffect, useState} from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

type FoodType = {
  id :number;
  name: string;
  image: string;
  description:string;
  price : any;
  available : boolean;

}
const Dashboard = () => {
  const [foods, setFoods] = useState<FoodType[]>([])
  const [editingFood , setEditingFood] = useState<FoodType>({} as FoodType)
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);


  useEffect(() => {

    async function getFoods()  {
        const response = await api.get('/foods');
        setFoods(response.data)
    }
    getFoods()
    
  }, [])

  const handleAddFood = async(food : Omit<FoodType, 'id'|'available'>) : Promise<void> => {
    
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });
      setFoods([...foods , response.data ])
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food : Omit<FoodType, 'id'|'available'>) => {

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(food =>
        food.id !== foodUpdated.data.id ? food : foodUpdated.data,
      );
      
      setFoods(foodsUpdated)

    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id : number) => {

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);

  }

  const toggleModal = () => {

    setModalOpen(!modalOpen)

  }

  const toggleEditModal = () => {

    setEditModalOpen(!editModalOpen)
    
  }

  const handleEditFood = (food : FoodType):void => {
    setEditingFood(food);
    toggleEditModal();
  }


  return(
    <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
  )
} 

export default Dashboard;



/* class Dashboard extends Component { */
  /* constructor(props) {
    super(props);
    this.state = {
      foods: [],
      editingFood: {},
      modalOpen: false,
      editModalOpen: false,
    }
  }
 */
 /*  async componentDidMount() {
    const response = await api.get('/foods');

    this.setState({ foods: response.data });
  } */

  

  /* handleUpdateFood = async food => {
    const { foods, editingFood } = this.state;

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      this.setState({ foods: foodsUpdated });
    } catch (err) {
      console.log(err);
    }
  } */

  /* handleDeleteFood = async id => {
    const { foods } = this.state;

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    this.setState({ foods: foodsFiltered });
  }

  toggleModal = () => {
    const { modalOpen } = this.state;

    this.setState({ modalOpen: !modalOpen });
  }

  toggleEditModal = () => {
    const { editModalOpen } = this.state;

    this.setState({ editModalOpen: !editModalOpen });
  }

  handleEditFood = food => {
    this.setState({ editingFood: food, editModalOpen: true });
  }
 */
 /*  render() {
    const { modalOpen, editModalOpen, editingFood, foods } = this.state;

    return (
      <>
        <Header openModal={this.toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={this.toggleModal}
          handleAddFood={this.handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={this.toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={this.handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={this.handleDeleteFood}
                handleEditFood={this.handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
  }
};
 */
