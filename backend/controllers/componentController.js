const Component = require('../models/componentModel');

const addComponent = async (req, res) => {
  const { name, use, technologies, tags } = req.body;

  try {
    const newComponent = new Component({
      name,
      use,
      technologies,
      tags
    });

    const component = await newComponent.save();
    res.json(component);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const updateComponent = async (req, res) => {
  const { name, use, technologies, tags, isDisabled } = req.body;
  const componentId = req.params.id;

  try {
    let component = await Component.findById(componentId);
    if (!component) {
      return res.status(404).json({ msg: 'Component not found' });
    }

    component.name = name || component.name;
    component.use = use || component.use;
    component.technologies = technologies || component.technologies;
    component.tags = tags || component.tags;
    component.isDisabled = isDisabled !== undefined ? isDisabled : component.isDisabled;

    await component.save();
    res.json(component);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const searchComponents = async (req, res) => {
  const { query } = req.query;
  const regex = new RegExp(query, 'i');

  try {
    const components = await Component.find({
      $or: [
        { name: regex },
        { use: regex },
        { technologies: regex },
        { tags: regex }
      ],
      isDisabled: false
    });

    res.json(components);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { addComponent, updateComponent, searchComponents };
