import React, { useRef, useState } from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const navigate = useNavigate();

  const breedSelectRef = useRef(null);
  const shelterSelectRef = useRef(null);
  const priceSelectRef = useRef(null);
  const [isBreedSelectActive, setBreedSelectActive] = useState(false);
  const [isShelterSelectActive, setShelterSelectActive] = useState(false);
  const [isPriceSelectActive, setPriceSelectActive] = useState(false);

  const handleSelectMenu = (selectRef, setActive) => {
    setActive((prevActive) => !prevActive);
    selectRef.current.classList.toggle("active");
  };

  const handleSelectItem = (e, selectRef, setActive) => {
    const selectedItem = e.target.innerText;
    selectRef.current.previousSibling.children[0].innerText = selectedItem;
    setActive(false);
    selectRef.current.classList.remove("active");
  };

  return (
    <>
      <div className="header">
        <div className="headerContainer">
          <div className="headerHead">
            <h1>Find your pet's new home</h1>
            <p>Adopt a pet, or post an ad to find a new home for your pet</p>
          </div>
          <div className="headerBody">
            <div className="searchBar">
              <div
                className={`custom_select ${
                  isBreedSelectActive ? "active" : ""
                }`}
                onClick={() =>
                  handleSelectMenu(breedSelectRef, setBreedSelectActive)
                }
              >
                <span>
                  <span className="value">Pet Breed</span>
                  <FontAwesomeIcon
                    className={`icon ${isBreedSelectActive ? "active" : ""}`}
                    icon={faChevronUp}
                  />
                  <FontAwesomeIcon
                    className={`icon ${isBreedSelectActive ? "" : "active"}`}
                    icon={faChevronDown}
                  />
                </span>
                <div
                  className={`select-list ${
                    isBreedSelectActive ? "active" : ""
                  }`}
                  ref={breedSelectRef}
                >
                  <div
                    className="list-item"
                    onClick={(e) =>
                      handleSelectItem(e, breedSelectRef, setBreedSelectActive)
                    }
                  >
                    German Shepherd
                  </div>
                  <div
                    className="list-item"
                    onClick={(e) =>
                      handleSelectItem(e, breedSelectRef, setBreedSelectActive)
                    }
                  >
                    Poodle
                  </div>
                  <div
                    className="list-item"
                    onClick={(e) =>
                      handleSelectItem(e, breedSelectRef, setBreedSelectActive)
                    }
                  >
                    Alaskan Malamute
                  </div>
                  <div
                    className="list-item"
                    onClick={(e) =>
                      handleSelectItem(e, breedSelectRef, setBreedSelectActive)
                    }
                  >
                    Siberian Husky
                  </div>
                  <div
                    className="list-item"
                    onClick={(e) =>
                      handleSelectItem(e, breedSelectRef, setBreedSelectActive)
                    }
                  >
                    Airedale Terrier
                  </div>
                </div>
              </div>

              <div
                className={`custom_select ${
                  isShelterSelectActive ? "active" : ""
                }`}
                onClick={() =>
                  handleSelectMenu(shelterSelectRef, setShelterSelectActive)
                }
              >
                <span>
                  <span className="value">Shelter</span>
                  <FontAwesomeIcon
                    className={`icon ${isShelterSelectActive ? "active" : ""}`}
                    icon={faChevronUp}
                  />
                  <FontAwesomeIcon
                    className={`icon ${isShelterSelectActive ? "" : "active"}`}
                    icon={faChevronDown}
                  />
                </span>
                <div
                  className={`select-list ${
                    isShelterSelectActive ? "active" : ""
                  }`}
                  ref={shelterSelectRef}
                >
                  <div
                    className="list-item"
                    onClick={(e) =>
                      handleSelectItem(
                        e,
                        shelterSelectRef,
                        setShelterSelectActive
                      )
                    }
                  >
                    Animal Sheed
                  </div>
                  <div
                    className="list-item"
                    onClick={(e) =>
                      handleSelectItem(
                        e,
                        shelterSelectRef,
                        setShelterSelectActive
                      )
                    }
                  >
                    JFK Animal Rescue
                  </div>
                  <div
                    className="list-item"
                    onClick={(e) =>
                      handleSelectItem(
                        e,
                        shelterSelectRef,
                        setShelterSelectActive
                      )
                    }
                  >
                    Cattle Crush
                  </div>
                </div>
              </div>

              <div
                className={`custom_select ${
                  isPriceSelectActive ? "active" : ""
                }`}
                onClick={() =>
                  handleSelectMenu(priceSelectRef, setPriceSelectActive)
                }
              >
                <span>
                  <span className="value">Price Range</span>
                  <FontAwesomeIcon
                    className={`icon ${isPriceSelectActive ? "active" : ""}`}
                    icon={faChevronUp}
                  />
                  <FontAwesomeIcon
                    className={`icon ${isPriceSelectActive ? "" : "active"}`}
                    icon={faChevronDown}
                  />
                </span>
                <div
                  className={`select-list ${
                    isPriceSelectActive ? "active" : ""
                  }`}
                  ref={priceSelectRef}
                >
                  <div
                    className="list-item"
                    onClick={(e) =>
                      handleSelectItem(e, priceSelectRef, setPriceSelectActive)
                    }
                  >
                    1k to 10k
                  </div>
                  <div
                    className="list-item"
                    onClick={(e) =>
                      handleSelectItem(e, priceSelectRef, setPriceSelectActive)
                    }
                  >
                    10k to 15k
                  </div>
                  <div
                    className="list-item"
                    onClick={(e) =>
                      handleSelectItem(e, priceSelectRef, setPriceSelectActive)
                    }
                  >
                    15k to 20k
                  </div>
                  <div
                    className="list-item"
                    onClick={(e) =>
                      handleSelectItem(e, priceSelectRef, setPriceSelectActive)
                    }
                  >
                    20k to 25k
                  </div>
                  <div
                    className="list-item"
                    onClick={(e) =>
                      handleSelectItem(e, priceSelectRef, setPriceSelectActive)
                    }
                  >
                    25k to 30k
                  </div>
                </div>
              </div>

              <button
                className="searchBtn"
                onClick={() => {
                  navigate("/adopt");
                }}
              >
                <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
