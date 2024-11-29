
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Admin/Login";
import AdminDashboard from "./components/Admin/AdminDashboard"; // Import AdminDashboard
import Dashboard from "./components/Admin/Dashboard";
import CreateJob from "./components/Admin/Jobs/CreateJob"
import ViewJobs from "./components/Admin/Jobs/ViewJobs"
import JobDetails from "./components/Admin/Jobs/JobDetails"
import JobApplications from "./components/Admin/Jobs/JobApplications"
import JobApplicationsOfAJob from "./components/Admin/Jobs/JobApplicationsOfAJob"
import EditJob from "./components/Admin/Jobs/EditJob"

import UserLogin from "./components/User/UserLogin";
import UserRegister from "./components/User/UserRegister";
import HomePage from "./components/User/HomePage"
import UserDashboard from "./components/User/UserDashboard";
import OpenToApplyJobs from "./components/User/JobsBoard/OpenToApplyJobs"
import AppliedJobs from "./components/User/JobsBoard/AppliedJobs"
import ShortlistedJobs from "./components/User/JobsBoard/ShortlistedJobs"
import RejectedJobs from "./components/User/JobsBoard/RejectedJobs"
import NotAppliedJobs from "./components/User/JobsBoard/NotAppliedJobs"
import JobDetailsUser from "./components/User/JobsBoard/JobDetailsUser"
import ApplyJobDetailsUser from "./components/User/JobsBoard/ApplyJobDetailsUser"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLogin />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/admin/login" element={<Login />} />
      
      {/* Admin Dashboard route with nested routes */}
      <Route path="/admin-dashboard" element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            
                            <AdminDashboard />
                            
                        </ProtectedRoute>
                    }>
        {/* Nested route for the home page within the Admin Dashboard */}
        <Route index element={<Dashboard />} />
        <Route path="create-job" element={<CreateJob />} />
        <Route path="view-jobs" element={<ViewJobs />} />
        <Route path="job-details/:id" element={<JobDetails />} />
        <Route path="job-edit/:id" element={<EditJob />} />
        <Route path="job-applications" element={<JobApplications />} />
        <Route path="job-applications/:id" element={<JobApplicationsOfAJob />} />
        {/* Add other nested routes as needed */}
      </Route>

      <Route path="/user-dashboard" element={
                        <ProtectedRoute allowedRoles={["user"]}>
                            
                            <UserDashboard />
                            
                        </ProtectedRoute>
                    }>
        {/* Nested route for the home page within the Admin Dashboard */}
        <Route index element={<HomePage />} />
        <Route path="jobs/openToApply" element={<OpenToApplyJobs />} />
        <Route path="jobs/applied" element={<AppliedJobs />} />
        <Route path="jobs/shortlisted" element={<ShortlistedJobs />} />
        <Route path="jobs/not-shortlisted" element={<RejectedJobs />} />
        <Route path="jobs/notApplied" element={<NotAppliedJobs />} /> 
        <Route path="job-details/:id" element={<JobDetailsUser />} />
        <Route path="job-details/apply/:id" element={<ApplyJobDetailsUser />} /> 
         {/* Add other nested routes as needed */}
      </Route>

    </Routes>
  );
};

export default App;

