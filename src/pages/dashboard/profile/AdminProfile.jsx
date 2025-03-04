import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCalendarCheck, FaUsers } from "react-icons/fa";
import { GiProfit } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import Loading from "../../../components/Loading";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();

  const { data: chartData = [], isLoading: chartDataLoading } = useQuery({
    queryKey: ["appointmentState"],
    queryFn: async () => {
      const res = await axiosSecure.get("/appointmentState");
      return res.data;
    },
  });
  const { data: adminStats, isLoading: adminStatsLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adminStats");
      return res.data;
    },
  });
  const userCount = adminStats?.userCount || 0;
  const appointmentHistoryCount = adminStats?.appointmentHistoryCount || 0;
  const providerCount = adminStats?.providerCount || 0;
  const revenue = adminStats?.revenue || 0;

  if (adminStatsLoading || chartDataLoading) {
    return <Loading />;
  }

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const pieChartData = chartData.historyResult?.map((data) => ({
    name: data._id,
    value: data.totalRevenue,
  }));

  return (
    <div className="space-y-10">
      <div className="stats shadow w-full md:mt-10 mt-2">
        <div className="stat">
          <div className="stat-figure text-dark-700 text-4xl">
            <FaUsers />
          </div>
          <div className="stat-title">Total User</div>
          <div className="stat-value">{userCount}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-blue-800 text-4xl">
            <FaCalendarCheck />
          </div>
          <div className="stat-title">Total Appointment complete</div>
          <div className="stat-value">{appointmentHistoryCount}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary text-4xl">
            <FaUserDoctor />
          </div>
          <div className="stat-title">Total number of provider</div>
          <div className="stat-value">{providerCount}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-yellow-500 text-4xl">
            <GiProfit />
          </div>
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value"> ৳ {revenue.toFixed(2)}</div>
        </div>
      </div>
      <div className="flex justify-around">
        <div>
          <p>Total pending appointment</p>
          <BarChart
            width={500}
            height={300}
            data={chartData.appointmentResult}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Bar
              dataKey="totalAppointments"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData.appointmentResult.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div>
          <p>Total Complete appointment</p>
          <BarChart
            width={500}
            height={300}
            data={chartData.historyResult}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Bar
              dataKey="totalAppointments"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData.historyResult.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>
      <div>
        <p>revenue presentence form all Complete appointment</p>

        <PieChart width={400} height={400}>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>
      </div>
    </div>
  );
};

export default AdminProfile;
