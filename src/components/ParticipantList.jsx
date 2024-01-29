import classes from "../styles/ParticipantList.module.css";

const ParticipantList = ({trip}) => {
    if(!trip?.participants?.length) return  <p>No participants available.</p>;
    return (
      <>
      <h3>Participant List</h3>
      {
        trip.participants.map((participant, index) => (
            <div className={classes.participantCard} key={index}>
                <div className={classes.cardContent}>
                    <div className={classes.participantHeaderCtn}>
                         <img src={participant.picture} className={classes.participantPicture}/>
                         <p className={classes.participantUserName}>{participant.username}</p>
                        
                    </div>
                </div>
            </div>
        ))
        }
    </>  
    )

};

export default ParticipantList;