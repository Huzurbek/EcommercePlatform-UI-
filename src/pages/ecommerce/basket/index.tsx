// import { fetchBaskets } from "../../../features/basket/basketApi";
import { useAppSelector } from "../../../hooks/redux";

const Basket = () => {
  const { baskets } = useAppSelector((state) => state.basketReducer);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchBaskets());
  // }, [dispatch]);
  console.log("what is basket", baskets);
  return (
    <div>
      <p>Basket List</p>
      {/* <ul>
        {baskets.map((item) => (
          <li key={item.id}>{item.device.name}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Basket;
