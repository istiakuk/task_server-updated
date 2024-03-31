const Attendance = require('../models/Attendance');

exports.createAttendance = async (req, res) => {
  try {
    const newAttendance = await Attendance.create(req.body);
    res.status(201).json(newAttendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllAttendance = async (req, res) => {
  try {
    const allAttendance = await Attendance.find();
    res.status(200).json(allAttendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance not found' });
    }
    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance not found' });
    }
    await Attendance.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: 'Attendance updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance not found' });
    }
    await Attendance.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Attendance deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.punchIn = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming user ID is available in the request after authentication
    const existingAttendance = await Attendance.findOne({ userId, finishingTime: null });
    if (existingAttendance) {
      return res.status(400).json({ message: 'You have already punched in' });
    }
    const newAttendance = new Attendance({ userId, startingTime: new Date() });
    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.punchOut = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming user ID is available in the request after authentication
    const existingAttendance = await Attendance.findOne({ userId, finishingTime: null });
    if (!existingAttendance) {
      return res.status(400).json({ message: 'You have not punched in yet' });
    }
    existingAttendance.finishingTime = new Date();
    await existingAttendance.save();
    res.status(200).json({ message: 'Punched out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
