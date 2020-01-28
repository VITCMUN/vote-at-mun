const logger = require('../../winston');

exports.addPoll = async (
    _,
  { title, voting_type, tst, description, raised_by },
  { currentUser, Poll }
) => {
    if (!currentUser || currentUser.userType !== 1) {
        throw new Error('No Security Clearance');
    }

    await Poll.create({
        title: title,
        voting_type: voting_type,
        total_speaker_time: tst,
        description: description,
        raised_by: raised_by,
    }).catch((err) => {
        logger.error(`Error in creating poll::${err}`);
        return new Error('Something went wrong');
    });
    logger.info(`New Poll created::${title}`);
    return title
}