import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import back from "../../images/back2.png";
import { useDispatch, useSelector } from "react-redux";
import { getDietTypes } from "../../redux/actions";
import styles from "./Form.module.css";

function validationForm(form) {
  const regex = /^[A-Za-z0-9 ]+$/;
  let errors = {};
  if (!form.name) errors.name = "please put the title of the recipe";
  else if (!regex.test(form.name)) errors.name = "Without special characters";
  else errors.name = "";
  if (!form.summary) errors.summary = "please put the summary of the recipe";
  else errors.summary = "";
  if (form.health_score < 0 || form.health_score > 100 || !form.health_score)
    errors.health_score = "put a health score between 0-100";
  return errors;
}

const Form = () => {
  const dietTypes = useSelector((state) => state.dietTypes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDietTypes());
  }, [dispatch]);

  const [form, setForm] = useState({
    name: "",
    image: "",
    summary: "",
    health_score: "",
    steps: "",
    dietTypes: [],
    dishTypes: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    summary: "",
    health_score: "",
    steps: [],
    dietTypes: [],
    dishTypes: [],
  });

  const changeHandler = (event) => {
    //leer lo que escribo y setearlo en el estado que corresponda
    const property = event.target.name;
    const value = event.target.value;
    //validate(form);
    setErrors(validationForm({ ...form, [property]: [value] })); //paso lo mismo que va a estar milesemas de segundos despues en el estado para que sea valdiado
    setForm({ ...form, [property]: value });
  };

  const handlerSteps = (e) => {
    setForm({ ...form, steps: [e.target.value] });
  };

  const handlerTypes = (e) => {
    let newDiets = form.dietTypes;
    let index = newDiets.indexOf(e.target.value);
    if (index >= 0) {
      newDiets.splice(index, 1);
    } else {
      newDiets.push(e.target.value);
    }
    setForm({ ...form, dietTypes: newDiets });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (errors.name || errors.summary || errors.health_score) {
      return alert("Fields missing");
    }
    await axios
      .post("http://localhost:3001/recipe", form)
      .then((res) => alert(res))
      .catch((err) => alert(err));


    setForm({
      name: "",
      image: "",
      summary: "",
      health_score: "",
      steps: "",
      dietTypes: [],
      dishTypes: [],
    });
    
    alert("Recipe created successfully")
    
    window.location.reload();
  };

  return (
    <div className={styles.containerForm}>
      <div className={styles.image}>
        <Link to="/home">
          <img src={back} alt="back" />
        </Link>
      </div>

      <div className={styles.form}>
        <h1>Create a new Recipe👨‍🍳</h1>
        <form onSubmit={submitHandler}>
          <div className={styles.name}>
            <input
              type="text"
              value={form.name}
              onChange={(e) => {
                changeHandler(e);
              }}
              size="50"
              name="name"
              placeholder="*Add a name recipe..."
            />
            {errors.name && (
              <span className={styles.form_err}>{errors.name}</span>
            )}
          </div>

          <div className={styles.url}>
            <input
              type="text"
              size="50"
              value={form.image}
              onChange={(e) => {
                changeHandler(e);
              }}
              name="image"
              placeholder="Add a Url Image..."
            />
          </div>

          <div className={styles.summary}>
            <textarea
              rows="4" // numero de lineas que serán visibles
              cols="50" // anchura, si no se define es 20 por defecto
              value={form.summary}
              onChange={changeHandler}
              name="summary"
              placeholder="*Insert a description or Summary of the recipe..."
            />
            {errors.summary && (
              <span className={styles.form_err}>{errors.summary}</span>
            )}
          </div>

          <div className={styles.diets}>
            <h3>*Choose Diets of the recipe: </h3>
            {dietTypes?.map((el) => {
              return (
                <div>
                  <input
                    onChange={handlerTypes}
                    type="checkbox"
                    name={el.name}
                    value={el.name}
                    key={el.id}
                  />
                  <label for={el.name}> {el.name}</label>
                  <br></br>
                </div>
              );
            })}
          </div>

          <div className={styles.steps}>
            <textarea
              rows="4" // numero de lineas que serán visibles
              cols="50" // anchura, si no se define es 20 por defecto
              value={form.steps}
              onChange={handlerSteps}
              name="steps"
              placeholder="Insert the Steps (INSTRUCTIONS) of the Recipe..."
            />
          </div>

          <div className={styles.health}>
            <label for="quantity">*Health Score (between 1 and 100): </label>
            <input
              onChange={changeHandler}
              type="number"
              name="health_score"
              min="1"
              max="100"
            />
            {errors.health_score && (
              <span className={styles.form_err}>{errors.health_score}</span>
            )}
          </div>

          <button type="submit">Submit✔</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
