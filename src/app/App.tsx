import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Plus,
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  PieChart as PieChartIcon,
  Target,
  Settings,
  LogOut,
  Trash2,
  Search,
  Filter,
  Sun,
  Moon,
  Download,
  Edit,
  TrendingUp,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Loader2,
  Sparkles,
  Zap,
  Shield,
  Users,
  BarChart3,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Area,
  AreaChart,
} from 'recharts';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { FinanceProvider, useFinance } from './contexts/FinanceContext';
import { CategoryIcon } from './components/CategoryIcon';
import { TagInput } from './components/TagInput';
import CurrencyInput from 'react-currency-input-field';

// Enhanced Theme configuration with gradients and better colors
const themes = {
  emerald: {
    primary: 'bg-emerald-600',
    primaryHover: 'bg-emerald-700',
    text: 'text-emerald-600',
    border: 'border-emerald-600',
    light: 'bg-emerald-50',
    gradient: 'from-emerald-500 to-emerald-600',
    bgGradient: 'from-emerald-50 to-green-50',
    accent: 'bg-emerald-100',
    shadow: 'shadow-emerald-100',
  },
  blue: {
    primary: 'bg-blue-600',
    primaryHover: 'bg-blue-700',
    text: 'text-blue-600',
    border: 'border-blue-600',
    light: 'bg-blue-50',
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-indigo-50',
    accent: 'bg-blue-100',
    shadow: 'shadow-blue-100',
  },
  purple: {
    primary: 'bg-purple-600',
    primaryHover: 'bg-purple-700',
    text: 'text-purple-600',
    border: 'border-purple-600',
    light: 'bg-purple-50',
    gradient: 'from-purple-500 to-purple-600',
    bgGradient: 'from-purple-50 to-violet-50',
    accent: 'bg-purple-100',
    shadow: 'shadow-purple-100',
  },
  rose: {
    primary: 'bg-rose-600',
    primaryHover: 'bg-rose-700',
    text: 'text-rose-600',
    border: 'border-rose-600',
    light: 'bg-rose-50',
    gradient: 'from-rose-500 to-rose-600',
    bgGradient: 'from-rose-50 to-pink-50',
    accent: 'bg-rose-100',
    shadow: 'shadow-rose-100',
  },
};

const categories = [
  { value: 'alimentacao', label: 'Alimentação' },
  { value: 'lazer', label: 'Lazer' },
  { value: 'transporte', label: 'Transporte' },
  { value: 'casa', label: 'Casa' },
  { value: 'saude', label: 'Saúde' },
  { value: 'pessoal', label: 'Pessoal' },
  { value: 'educacao', label: 'Educação' },
  { value: 'compras', label: 'Compras' },
  { value: 'viagem', label: 'Viagem' },
  { value: 'tecnologia', label: 'Tecnologia' },
  { value: 'outros', label: 'Outros' },
];

function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const { error } = isLogin
      ? await signIn(email, password)
      : await signUp(email, password, name);

    if (error) {
      setError(error.message || 'Ocorreu um erro. Tente novamente.');
    } else if (!isLogin) {
      setSuccess('Conta criada com sucesso! Faça o login.');
      setIsLogin(true);
    }
    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200/30 to-blue-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-rose-200/30 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-3xl mb-6 shadow-2xl shadow-emerald-200"
          >
            <Wallet className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2"
          >
            Finanças Pro
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg"
          >
            Controle suas finanças com estilo
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/10 p-8 border border-white/20"
        >
          <div className="flex gap-2 p-1 bg-gray-100/80 rounded-2xl mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setIsLogin(true);
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-white text-emerald-600 shadow-lg shadow-emerald-100'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Entrar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setIsLogin(false);
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-white text-emerald-600 shadow-lg shadow-emerald-100'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Criar Conta
            </motion.button>
          </div>

          <motion.form
            key={isLogin ? 'login' : 'signup'}
            initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-700">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Seu nome completo"
                    required={!isLogin}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                  <p className="text-rose-700 text-sm">{error}</p>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <p className="text-emerald-700 text-sm">{success}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Carregando...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  {isLogin ? 'Entrar' : 'Criar Conta'}
                </>
              )}
            </motion.button>
          </motion.form>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center mt-6 text-sm text-gray-500"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              Seguro
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              Rápido
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              Gratuito
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function TransactionModal({
  show,
  onClose,
  darkMode,
  theme,
}: {
  show: boolean;
  onClose: () => void;
  darkMode: boolean;
  theme: keyof typeof themes;
}) {
  const { addTransaction } = useFinance();
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('outros');
  const [account, setAccount] = useState('principal');
  const [tags, setTags] = useState<string[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setType('expense');
    setDescription('');
    setValue('');
    setCategory('outros');
    setAccount('principal');
    setTags([]);
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addTransaction({
        description,
        value: parseFloat(value || '0'),
        type,
        category,
        account,
        tags,
        date: new Date(date).toISOString(),
      });
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className={`${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } w-full max-w-md rounded-t-[3rem] sm:rounded-[3rem] relative shadow-2xl max-h-[90vh] overflow-y-auto`}
        >
          <div className="sticky top-0 bg-inherit p-6 pb-4 border-b border-gray-100 dark:border-gray-700 rounded-t-[3rem]">
            <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 sm:hidden" />
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Novo Lançamento</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100 dark:bg-gray-700 rounded-2xl">
              <button
                type="button"
                onClick={() => setType('income')}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                  type === 'income'
                    ? 'bg-white dark:bg-gray-600 text-emerald-600 shadow-sm'
                    : 'text-gray-500'
                }`}
              >
                <ArrowUpCircle size={18} />
                Receita
              </button>
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                  type === 'expense'
                    ? 'bg-white dark:bg-gray-600 text-rose-600 shadow-sm'
                    : 'text-gray-500'
                }`}
              >
                <ArrowDownCircle size={18} />
                Despesa
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 opacity-70">
                Descrição
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Almoço no restaurante"
                className={`w-full p-4 rounded-2xl border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-50 border-gray-100'
                } focus:ring-2 focus:ring-emerald-500 outline-none`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 opacity-70">
                Valor
              </label>
              <CurrencyInput
                value={value}
                onValueChange={(value) => setValue(value || '')}
                prefix="€ "
                decimalsLimit={2}
                decimalSeparator=","
                groupSeparator="."
                placeholder="€ 0,00"
                className={`w-full p-4 rounded-2xl border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-50 border-gray-100'
                } focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-2xl`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 opacity-70">
                Categoria
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full p-4 rounded-2xl border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-50 border-gray-100'
                } outline-none`}
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 opacity-70">
                Data
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full p-4 rounded-2xl border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-50 border-gray-100'
                } outline-none`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 opacity-70">
                Conta
              </label>
              <select
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className={`w-full p-4 rounded-2xl border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-50 border-gray-100'
                } outline-none`}
              >
                <option value="principal">Conta Principal</option>
                <option value="poupanca">Poupança</option>
                <option value="cartao">Cartão de Crédito</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 opacity-70">
                Tags
              </label>
              <TagInput
                tags={tags}
                onTagsChange={setTags}
                placeholder="Adicione tags (Enter ou vírgula)"
                darkMode={darkMode}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 ${themes[theme].primary} text-white rounded-2xl font-bold shadow-lg mt-6 active:scale-95 transition-all disabled:opacity-50`}
            >
              {loading ? 'Salvando...' : 'Confirmar Lançamento'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function GoalModal({
  show,
  onClose,
  darkMode,
  theme,
  editGoal,
}: {
  show: boolean;
  onClose: () => void;
  darkMode: boolean;
  theme: keyof typeof themes;
  editGoal?: any;
}) {
  const { addGoal, updateGoal } = useFinance();
  const [name, setName] = useState(editGoal?.name || '');
  const [targetAmount, setTargetAmount] = useState(
    editGoal?.targetAmount?.toString() || ''
  );
  const [currentAmount, setCurrentAmount] = useState(
    editGoal?.currentAmount?.toString() || ''
  );
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName('');
    setTargetAmount('');
    setCurrentAmount('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editGoal) {
        await updateGoal(editGoal.id, {
          name,
          targetAmount: parseFloat(targetAmount || '0'),
          currentAmount: parseFloat(currentAmount || '0'),
        });
      } else {
        await addGoal({
          name,
          targetAmount: parseFloat(targetAmount || '0'),
          currentAmount: parseFloat(currentAmount || '0'),
          icon: 'target',
          color: theme,
        });
      }
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error with goal:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className={`${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } w-full max-w-md p-8 rounded-t-[3rem] sm:rounded-[3rem] relative shadow-2xl`}
        >
          <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6 sm:hidden" />
          <h3 className="text-xl font-bold mb-6">
            {editGoal ? 'Editar Meta' : 'Nova Meta'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 opacity-70">
                Nome da Meta
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Viagem para Paris"
                className={`w-full p-4 rounded-2xl border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-50 border-gray-100'
                } focus:ring-2 focus:ring-emerald-500 outline-none`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 opacity-70">
                Valor da Meta
              </label>
              <CurrencyInput
                value={targetAmount}
                onValueChange={(value) => setTargetAmount(value || '')}
                prefix="€ "
                decimalsLimit={2}
                decimalSeparator=","
                groupSeparator="."
                placeholder="€ 0,00"
                className={`w-full p-4 rounded-2xl border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-50 border-gray-100'
                } focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-xl`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 opacity-70">
                Valor Atual
              </label>
              <CurrencyInput
                value={currentAmount}
                onValueChange={(value) => setCurrentAmount(value || '')}
                prefix="€ "
                decimalsLimit={2}
                decimalSeparator=","
                groupSeparator="."
                placeholder="€ 0,00"
                className={`w-full p-4 rounded-2xl border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-50 border-gray-100'
                } focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-xl`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 ${themes[theme].primary} text-white rounded-2xl font-bold shadow-lg mt-6 active:scale-95 transition-all disabled:opacity-50`}
            >
              {loading ? 'Salvando...' : editGoal ? 'Atualizar Meta' : 'Criar Meta'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function Dashboard() {
  const { transactions, preferences } = useFinance();
  const { theme, darkMode } = preferences;

  const stats = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthTransactions = transactions.filter((t) => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    const income = monthTransactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.value, 0);

    const expenses = monthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.value, 0);

    return { income, expenses, balance: income - expenses };
  }, [transactions]);

  const chartData = useMemo(() => {
    const categoryTotals: Record<string, number> = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.value;
      });

    return Object.entries(categoryTotals)
      .map(([name, value]) => ({
        name: categories.find((c) => c.value === name)?.label || name,
        value,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [transactions]);

  const monthlyData = useMemo(() => {
    const months: Record<string, { income: number; expense: number }> = {};
    
    transactions.forEach((t) => {
      const date = new Date(t.date);
      const monthKey = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (!months[monthKey]) {
        months[monthKey] = { income: 0, expense: 0 };
      }
      
      if (t.type === 'income') {
        months[monthKey].income += t.value;
      } else {
        months[monthKey].expense += t.value;
      }
    });

    return Object.entries(months)
      .map(([month, data]) => ({
        month,
        receitas: data.income,
        despesas: data.expense,
      }))
      .slice(-6);
  }, [transactions]);

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f43f5e', '#f59e0b'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Balance Card */}
      <div
        className={`bg-gradient-to-br ${themes[theme].gradient} p-6 rounded-[2rem] text-white shadow-xl space-y-4`}
      >
        <div>
          <span className="text-sm opacity-90">Saldo do Mês</span>
          <h3 className="text-4xl font-bold mt-1">
            € {stats.balance.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpCircle size={18} />
              <span className="text-xs opacity-90">Receitas</span>
            </div>
            <span className="font-bold text-lg">
              € {stats.income.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownCircle size={18} />
              <span className="text-xs opacity-90">Despesas</span>
            </div>
            <span className="font-bold text-lg">
              € {stats.expenses.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Charts */}
      {chartData.length > 0 && (
        <div
          className={`${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } p-5 rounded-3xl shadow-sm border ${
            darkMode ? 'border-gray-700' : 'border-gray-100'
          }`}
        >
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <PieChartIcon size={18} />
            Principais Despesas
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) =>
                    `€ ${value.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}`
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Monthly Evolution */}
      {monthlyData.length > 0 && (
        <div
          className={`${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } p-5 rounded-3xl shadow-sm border ${
            darkMode ? 'border-gray-700' : 'border-gray-100'
          }`}
        >
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <TrendingUp size={18} />
            Evolução Mensal
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value: number) =>
                    `€ ${value.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}`
                  }
                />
                <Legend />
                <Bar dataKey="receitas" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="despesas" fill="#f43f5e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h4 className="font-bold">Transações Recentes</h4>
        </div>

        {transactions.slice(0, 5).map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } p-4 rounded-2xl flex items-center justify-between shadow-sm border ${
              darkMode ? 'border-gray-700' : 'border-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-xl ${
                  t.type === 'income'
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-rose-100 text-rose-600'
                }`}
              >
                <CategoryIcon category={t.category} />
              </div>
              <div>
                <p className="font-bold text-sm">{t.description}</p>
                <p className="text-xs opacity-50">
                  {categories.find((c) => c.value === t.category)?.label} •{' '}
                  {new Date(t.date).toLocaleDateString('pt-PT')}
                </p>
              </div>
            </div>
            <span
              className={`font-bold ${
                t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
              }`}
            >
              {t.type === 'income' ? '+' : '-'} €
              {t.value.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            </span>
          </motion.div>
        ))}

        {transactions.length === 0 && (
          <div className="text-center py-12 opacity-50">
            <p>Nenhuma transação ainda</p>
            <p className="text-sm">Clique no + para adicionar</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function TransactionsScreen() {
  const { transactions, deleteTransaction, preferences } = useFinance();
  const { theme, darkMode } = preferences;
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch =
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilter =
        filterType === 'all' || t.type === filterType;

      return matchesSearch && matchesFilter;
    });
  }, [transactions, searchTerm, filterType]);

  const groupedTransactions = useMemo(() => {
    const groups: Record<string, typeof transactions> = {};

    filteredTransactions.forEach((t) => {
      const date = new Date(t.date);
      const key = date.toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });

      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(t);
    });

    return groups;
  }, [filteredTransactions]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <h3 className="text-2xl font-bold">Extrato</h3>

      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40"
          size={20}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar transações..."
          className={`w-full pl-12 pr-4 py-3 rounded-2xl border ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-100'
          } focus:ring-2 focus:ring-emerald-500 outline-none`}
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
            filterType === 'all'
              ? `${themes[theme].primary} text-white`
              : darkMode
              ? 'bg-gray-800 border border-gray-700'
              : 'bg-white border border-gray-100'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilterType('income')}
          className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
            filterType === 'income'
              ? 'bg-emerald-600 text-white'
              : darkMode
              ? 'bg-gray-800 border border-gray-700'
              : 'bg-white border border-gray-100'
          }`}
        >
          Receitas
        </button>
        <button
          onClick={() => setFilterType('expense')}
          className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
            filterType === 'expense'
              ? 'bg-rose-600 text-white'
              : darkMode
              ? 'bg-gray-800 border border-gray-700'
              : 'bg-white border border-gray-100'
          }`}
        >
          Despesas
        </button>
      </div>

      {/* Grouped Transactions */}
      <div className="space-y-6">
        {Object.entries(groupedTransactions).map(([date, txs]) => (
          <div key={date} className="space-y-2">
            <h4 className="text-sm font-semibold opacity-50 px-1">{date}</h4>
            {txs.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } p-4 rounded-2xl flex items-center justify-between shadow-sm border ${
                  darkMode ? 'border-gray-700' : 'border-gray-100'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`p-3 rounded-xl ${
                      t.type === 'income'
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-rose-100 text-rose-600'
                    }`}
                  >
                    <CategoryIcon category={t.category} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{t.description}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {t.tags.map((tag, i) => (
                        <span
                          key={i}
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            darkMode
                              ? 'bg-gray-700 text-gray-300'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span
                      className={`font-bold block ${
                        t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      {t.type === 'income' ? '+' : '-'} €
                      {t.value.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-xs opacity-50">{t.account}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Deseja excluir esta transação?')) {
                        deleteTransaction(t.id);
                      }
                    }}
                    className="text-gray-400 hover:text-rose-500 p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ))}

        {Object.keys(groupedTransactions).length === 0 && (
          <div className="text-center py-12 opacity-50">
            <p>Nenhuma transação encontrada</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function GoalsScreen() {
  const { goals, transactions, deleteGoal, updateGoal, preferences } = useFinance();
  const { theme, darkMode } = preferences;
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<any>(null);

  // Calculate monthly savings average
  const monthlySavings = useMemo(() => {
    const now = new Date();
    const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));

    const recentTransactions = transactions.filter(
      (t) => new Date(t.date) >= threeMonthsAgo
    );

    const income = recentTransactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.value, 0);

    const expenses = recentTransactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.value, 0);

    return (income - expenses) / 3;
  }, [transactions]);

  const handleEdit = (goal: any) => {
    setEditingGoal(goal);
    setShowGoalModal(true);
  };

  const handleCloseModal = () => {
    setEditingGoal(null);
    setShowGoalModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Metas</h3>
        <button
          onClick={() => setShowGoalModal(true)}
          className={`${themes[theme].primary} text-white px-4 py-2 rounded-xl font-semibold shadow-lg active:scale-95 transition-all`}
        >
          Nova Meta
        </button>
      </div>

      <div className="grid gap-4">
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const remaining = goal.targetAmount - goal.currentAmount;
          const monthsToGoal =
            monthlySavings > 0 ? Math.ceil(remaining / monthlySavings) : 0;

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } p-5 rounded-3xl border ${
                darkMode ? 'border-gray-700' : 'border-gray-100'
              } shadow-sm`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`${themes[theme].light} ${themes[theme].text} p-3 rounded-2xl`}
                  >
                    <Target size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg">{goal.name}</p>
                    <p className="text-sm opacity-50">
                      Meta: €{' '}
                      {goal.targetAmount.toLocaleString('pt-PT', {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-emerald-500">
                    {progress.toFixed(0)}%
                  </span>
                  <button
                    onClick={() => handleEdit(goal)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Deseja excluir esta meta?')) {
                        deleteGoal(goal.id);
                      }
                    }}
                    className="p-2 hover:bg-rose-100 dark:hover:bg-rose-900/20 rounded-lg transition-colors text-rose-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`${themes[theme].primary} h-full`}
                />
              </div>

              <div className="flex justify-between text-sm">
                <span className="opacity-70">
                  Economizado: €{' '}
                  {goal.currentAmount.toLocaleString('pt-PT', {
                    minimumFractionDigits: 2,
                  })}
                </span>
                {remaining > 0 && monthsToGoal > 0 && (
                  <span className="opacity-70">
                    Faltam ~{monthsToGoal}{' '}
                    {monthsToGoal === 1 ? 'mês' : 'meses'}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}

        {goals.length === 0 && (
          <div className="text-center py-12 opacity-50">
            <Target className="w-16 h-16 mx-auto mb-4" />
            <p>Nenhuma meta criada</p>
            <p className="text-sm">Clique em "Nova Meta" para começar</p>
          </div>
        )}
      </div>

      <GoalModal
        show={showGoalModal}
        onClose={handleCloseModal}
        darkMode={darkMode}
        theme={theme}
        editGoal={editingGoal}
      />
    </motion.div>
  );
}

function SettingsScreen() {
  const { user, signOut } = useAuth();
  const { transactions, preferences, updatePreferences } = useFinance();
  const { theme, darkMode } = preferences;

  const exportData = () => {
    const data = JSON.stringify(transactions, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financas-pro-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const exportCSV = () => {
    const headers = [
      'Data',
      'Descrição',
      'Tipo',
      'Valor',
      'Categoria',
      'Conta',
      'Tags',
    ];
    const rows = transactions.map((t) => [
      new Date(t.date).toLocaleDateString('pt-PT'),
      t.description,
      t.type === 'income' ? 'Receita' : 'Despesa',
      t.value.toFixed(2),
      t.category,
      t.account,
      t.tags.join('; '),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financas-pro-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold">Configurações</h3>

      {/* Appearance */}
      <div
        className={`${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-3xl overflow-hidden shadow-sm border ${
          darkMode ? 'border-gray-700' : 'border-gray-100'
        }`}
      >
        <div className="p-5 border-b border-gray-100 dark:border-gray-700">
          <p className="text-sm font-semibold opacity-50 mb-4">APARÊNCIA</p>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-3">Tema de Cor</p>
              <div className="flex gap-3">
                {(Object.keys(themes) as Array<keyof typeof themes>).map((t) => (
                  <button
                    key={t}
                    onClick={() => updatePreferences({ theme: t })}
                    className={`w-12 h-12 rounded-full ${themes[t].primary} border-4 ${
                      theme === t
                        ? 'border-white ring-2 ring-gray-300 dark:ring-gray-600'
                        : 'border-transparent'
                    } transition-all active:scale-90`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                <span className="font-medium">Modo Escuro</span>
              </div>
              <button
                onClick={() => updatePreferences({ darkMode: !darkMode })}
                className={`w-14 h-8 rounded-full transition-colors ${
                  darkMode ? themes[theme].primary : 'bg-gray-200'
                } relative`}
              >
                <motion.div
                  animate={{ x: darkMode ? 24 : 0 }}
                  className="w-6 h-6 bg-white rounded-full absolute top-1 left-1"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Export */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-700">
          <p className="text-sm font-semibold opacity-50 mb-4">DADOS</p>

          <div className="space-y-2">
            <button
              onClick={exportData}
              className="w-full flex items-center justify-between py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl px-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Download size={18} />
                </div>
                <span className="font-medium text-sm">Exportar JSON</span>
              </div>
            </button>

            <button
              onClick={exportCSV}
              className="w-full flex items-center justify-between py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl px-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Download size={18} />
                </div>
                <span className="font-medium text-sm">Exportar CSV</span>
              </div>
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="p-5">
          <button
            onClick={() => {
              if (confirm('Deseja realmente sair?')) {
                signOut();
              }
            }}
            className="w-full flex items-center justify-between py-3 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl px-3 transition-colors text-rose-600"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
                <LogOut size={18} />
              </div>
              <span className="font-medium text-sm">Sair da Conta</span>
            </div>
          </button>
        </div>
      </div>

      {/* User Info */}
      <div className="text-center opacity-30 text-xs space-y-1">
        <p>ID: {user?.id?.slice(0, 8)}...</p>
        <p>Email: {user?.email}</p>
        <p className="font-semibold">Finanças Pro v1.0.0</p>
        <p>Desenvolvido com ❤️</p>
      </div>
    </motion.div>
  );
}

function MainApp() {
  const { preferences } = useFinance();
  const { theme, darkMode } = preferences;
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Início', icon: Wallet },
    { id: 'transactions', label: 'Extrato', icon: Calendar },
    { id: 'goals', label: 'Metas', icon: Target },
    { id: 'settings', label: 'Ajustes', icon: Settings },
  ];

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      } pb-24 transition-colors duration-300`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-30 ${
          darkMode ? 'bg-gray-800/80' : 'bg-white/80'
        } backdrop-blur-xl p-5 flex justify-between items-center border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-100'
        } rounded-b-3xl shadow-sm`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl ${themes[theme].primary} text-white shadow-lg`}
          >
            <Wallet size={20} />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight">Finanças Pro</h2>
            <p className="text-xs opacity-60">
              {tabs.find((t) => t.id === activeTab)?.label}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && <Dashboard key="dashboard" />}
          {activeTab === 'transactions' && <TransactionsScreen key="transactions" />}
          {activeTab === 'goals' && <GoalsScreen key="goals" />}
          {activeTab === 'settings' && <SettingsScreen key="settings" />}
        </AnimatePresence>
      </main>

      {/* Floating Action Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowAddModal(true)}
        className={`fixed bottom-24 right-6 w-16 h-16 rounded-full ${themes[theme].primary} text-white shadow-2xl flex items-center justify-center z-40`}
      >
        <Plus size={28} />
      </motion.button>

      {/* Bottom Navigation */}
      <nav
        className={`fixed bottom-0 left-0 right-0 ${
          darkMode ? 'bg-gray-800/80' : 'bg-white/80'
        } backdrop-blur-xl border-t ${
          darkMode ? 'border-gray-700' : 'border-gray-100'
        } px-6 py-3 flex justify-between items-center z-50 rounded-t-[2.5rem] shadow-lg`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${
              activeTab === tab.id
                ? `${themes[theme].text} bg-${theme}-50 dark:bg-${theme}-900/20`
                : 'text-gray-400'
            }`}
          >
            <tab.icon size={22} />
            <span className="text-[10px] font-bold">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Transaction Modal */}
      <TransactionModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        darkMode={darkMode}
        theme={theme}
      />
    </div>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <FinanceProvider>
      <MainApp />
    </FinanceProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
