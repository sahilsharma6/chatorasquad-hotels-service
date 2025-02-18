

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [order, setOrder] = useState({});
    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export default useOrder = () => useContext(OrderContext);