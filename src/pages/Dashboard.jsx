import React, { useEffect, useState } from 'react';
import { Gem, Sparkles } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import CreationItem from '../components/CreationItem';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [plan, setPlan] = useState('Free');
  const [loading, setLoading] = useState(true);

  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });
      if (data.success) {
        setCreations(data.creations);
        setPlan(data.plan || 'Free');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-[87vh] lg:min-h-[70vh] w-full md:w-[70vw] lg:w-[80vw] border border-b-0 sm:border-b border-white/20 p-4 sm:p-2 bg-black/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl sm:mx-auto">

      {/* Card Section */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {/* Total creation card */}
        <div className="flex justify-between items-center w-full lg:w-[48%] p-4 sm:p-6 rounded-xl border border-white/10 backdrop-blur-lg shadow-md">
          <div className="text-slate-100">
            <p className="text-sm opacity-80">Total Creation</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg  text-white flex justify-center items-center shadow-md">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>

        {/* Active plan card */}
        <div className="flex justify-between items-center w-full lg:w-[48%] p-4 sm:p-6 rounded-xl border border-white/10 backdrop-blur-lg shadow-md">
          <div className="text-slate-100">
            <p className="text-sm opacity-80">Active Plan</p>
            <h2 className="text-xl font-semibold">
              {plan === 'premium' ? 'Premium' : 'Free'}
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br text-white flex justify-center items-center shadow-md">
            <Gem className="w-5 text-white" />
          </div>
        </div>
      </div>

      {/* Loading Spinner or Recent Creations */}
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-11 w-11 border-4 border-purple-500 border-t-transparent"></div>
        </div>
      ) : (
        <>
          <p className="text-lg font-semibold sticky top-0 text-slate-300 mb-3 z-10 p-1">
            Recent Creations
          </p>

          <div className="space-y-3  text-slate-100 h-[58vh] sm:h-[40vh] md:mx-4 md:h-[55.7vh] overflow-y-auto pr-2 scrollbar-none">
            {creations.map((item) => (
              <CreationItem key={item.id} item={item} />
            ))}
          </div>
        </>

      )}
    </div>
  );

};

export default Dashboard;
