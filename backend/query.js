import axios from "axios";
import resultStyles from "../styles/Results.module.css";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Navbar from "../pages/search/resultNavbar";



function MyPage({ data }) {
    // Use the `data` prop to access the response data here
    return data;
}

export default MyPage;
