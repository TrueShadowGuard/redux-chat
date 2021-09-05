import {useDispatch} from "react-redux";
import s from "../styles/asidePanel.module.css";
import {changeChannel} from "../state/reducer";
import * as PropTypes from "prop-types";

const Channel = ({name, id}) => {
  const dispatch = useDispatch();
  return (
    <li>
      <label className={s.channel}>
        <h2>{name}</h2>
        <input type="radio"
               name="channel"
               hidden
               onChange={() => dispatch(changeChannel(id))}
        />
      </label>
    </li>
  )
};

Channel.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
}

export default Channel;
