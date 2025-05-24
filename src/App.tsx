import Header from './containers/Header';
import Filters from './containers/Filters';
import ProductList from './containers/ProductList';
import Cart from './containers/Cart';
import Notification from './components/Notification';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-white text-gray-900">
      <Header />

      <main className="flex md:flex-row flex-col md:h-[calc(100vh-88px)]">
        <div className="sticky top-[88px] z-10 bg-white md:static md:h-[calc(100vh-88px)]">
          <Filters />
        </div>
        <ProductList />
        <Cart />
      </main>
      <Notification />
    </div>
  );
};

export default App;
