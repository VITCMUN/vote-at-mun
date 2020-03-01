exports.getCouncil = async (_, __, { Council }) => {
  const council = await Council.findAll({});
  if (council.length > 0) {
    const detail = council[council.length - 1];
    return {
      name: detail.name,
      url: detail.banner_url,
    };
  }

  return {
    name: 'NOT SET',
    url: ''
  };
};
