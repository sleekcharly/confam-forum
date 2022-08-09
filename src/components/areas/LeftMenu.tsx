import React, { useState, useEffect } from "react";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import Category from "../../models/Category";
import { getCategories } from "../../services/DataService";
import "./LeftMenu.css";
// import items form apollo
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

// query to get all categories
const GetAllCategories = gql`
  query getAllCategories {
    getAllCategories {
      id
      name
    }
  }
`;

const LeftMenu = () => {
  // initiate loading , error and data from useQuery
  const { loading, error, data } = useQuery(GetAllCategories);

  const { width } = useWindowDimensions();
  const [categories, setCategories] = useState<JSX.Element>(
    <div>Left Menu</div>
  );

  useEffect(() => {
    if (loading) {
      setCategories(<span>Loading ...</span>);
    } else if (error) {
      setCategories(<span>Error occurred loading categories ...</span>);
    } else {
      if (data && data.getAllCategories) {
        const cats = data.getAllCategories.map((cat: any) => {
          return (
            <li key={cat.id}>
              <Link to={`/categorythreads/${cat.id}`}>{cat.name}</Link>
            </li>
          );
        });

        setCategories(<ul className="category">{cats}</ul>);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (width <= 768) {
    return null;
  }

  return <div className="leftmenu">{categories}</div>;
};

export default LeftMenu;
