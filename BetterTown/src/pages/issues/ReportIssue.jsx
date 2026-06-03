import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Alert,
  IconButton,
  ImageList,
  ImageListItem,
  CircularProgress,
  FormHelperText,
  Snackbar,
} from '@mui/material';
import { PhotoCamera, LocationOn, Close, AddPhotoAlternate } from '@mui/icons-material';

const API_URL = import.meta.env.VITE_API_URL || 'https://bettertown.onrender.com/api';

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

function ReportIssue() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    description: '',
    location: '',
    landmark: '',
    photos: [],
    coordinates: null,
  });
  const [isLocating, setIsLocating] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

  const steps = ['Issue Details', 'Location', 'Photos & Submit'];

  const categories = [
    'Roads and Infrastructure',
    'Water Supply',
    'Sanitation',
    'Street Lighting',
    'Garbage Collection',
    'Public Safety',
  ];

  const validateStep = (step) => {
    let isValid = true;
    const newErrors = {};

    if (step === 0) {
      if (!formData.category.trim()) {
        newErrors.category = 'Please select an issue category';
        isValid = false;
      }
      
      if (!formData.description.trim()) {
        newErrors.description = 'Please provide a description of the issue';
        isValid = false;
      } else if (formData.description.trim().length < 10) {
        newErrors.description = 'Description should be at least 10 characters';
        isValid = false;
      }
    } else if (step === 1) {
      if (!formData.location.trim()) {
        newErrors.location = 'Please provide the location of the issue';
        isValid = false;
      }
    }

    setErrors(newErrors);
    
    if (!isValid) {
      setAlertMessage('Please fill in all required fields before proceeding');
      setShowAlert(true);
    }
    
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(false);

    if (!validateStep(0) || !validateStep(1)) {
        setAlertMessage('Please ensure all details are filled correctly.');
        setAlertSeverity('error');
        setShowAlert(true);
        if(!validateStep(0)) setActiveStep(0);
        else if (!validateStep(1)) setActiveStep(1);
        return; 
    }

    const token = localStorage.getItem('token');
    if (!token) {
        setAlertMessage('Authentication error. Please log in again.');
        setAlertSeverity('error');
        setShowAlert(true);
        return;
    }

    setIsSubmitting(true);

    try {
        // Convert all uploaded File objects to Base64 strings
        const base64Photos = await Promise.all(
            (formData.photos || []).map(file => convertToBase64(file))
        );

        const payload = {
            category: formData.category,
            description: formData.description,
            location: {
                address: formData.location,
                ...(formData.coordinates && formData.coordinates.length === 2 && {
                    coordinates: formData.coordinates
                })
            },
            landmark: formData.landmark,
            photos: base64Photos, 
        };

        const response = await fetch(`${API_URL}/issues`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || `HTTP error! status: ${response.status}`);
        }

        setAlertMessage('Issue reported successfully! Complaint ID: ' + result.issue.complaintId);
        setAlertSeverity('success');
        setShowAlert(true);
        setFormData({
            category: '',
            subCategory: '',
            description: '',
            location: '',
            landmark: '',
            photos: [],
            coordinates: null,
        });
        setPreviewImages([]);
        setErrors({});
        setActiveStep(0);

    } catch (error) {
        console.error("Error submitting issue:", error);
        setAlertMessage(`Submission failed: ${error.message}`);
        setAlertSeverity('error');
        setShowAlert(true);
    } finally {
        setIsSubmitting(false);
    }

  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;
    
    const totalPhotos = previewImages.length + files.length;
    if (totalPhotos > 3) {
      alert('You can upload a maximum of 3 photos');
      return;
    }
    
    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert('One or more files exceed the 5MB size limit');
      return;
    }
    
    setIsUploading(true);
    
    const newPreviewImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      uploading: true
    }));
    
    setPreviewImages(prev => [...prev, ...newPreviewImages]);
    
    setTimeout(() => {
      setPreviewImages(prev => 
        prev.map(img => 
          newPreviewImages.includes(img) ? { ...img, uploading: false } : img
        )
      );
      setIsUploading(false);
      
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...files]
      }));
    }, 1500);
  };
  
  const handleRemoveImage = (index) => {
    const updatedPreviews = [...previewImages];
    const removedPreview = updatedPreviews.splice(index, 1)[0];
    setPreviewImages(updatedPreviews);
    
    URL.revokeObjectURL(removedPreview.preview);
    
    const updatedPhotos = [...formData.photos];
    updatedPhotos.splice(index, 1);
    setFormData({
      ...formData,
      photos: updatedPhotos
    });
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setAlertMessage('Geolocation is not supported by your browser.');
      setAlertSeverity('error');
      setShowAlert(true);
      return;
    }

    setIsLocating(true);
    setAlertMessage('Fetching your coordinates...');
    setAlertSeverity('info');
    setShowAlert(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          setAlertMessage('Converting coordinates to address...');
          setShowAlert(true);

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch address from geocoding service');
          }

          const data = await response.json();
          
          if (data && data.display_name) {
            const address = data.display_name;
            const addressDetails = data.address || {};
            
            // Extract a possible landmark (road, neighborhood, suburb, or amenity)
            const landmarkValue = 
              addressDetails.amenity ||
              addressDetails.building ||
              addressDetails.road ||
              addressDetails.suburb ||
              '';

            setFormData(prev => ({
              ...prev,
              location: address,
              coordinates: [longitude, latitude], // GeoJSON format: [longitude, latitude]
              landmark: prev.landmark || landmarkValue
            }));

            setAlertMessage('Location updated successfully!');
            setAlertSeverity('success');
            setShowAlert(true);
          } else {
            setFormData(prev => ({
              ...prev,
              location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
              coordinates: [longitude, latitude]
            }));
            setAlertMessage('Coordinates fetched, but street address could not be resolved.');
            setAlertSeverity('warning');
            setShowAlert(true);
          }
        } catch (error) {
          console.error('Error reverse geocoding:', error);
          setFormData(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            coordinates: [longitude, latitude]
          }));
          setAlertMessage('Could not retrieve full address. Filled with coordinates instead.');
          setAlertSeverity('warning');
          setShowAlert(true);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setIsLocating(false);
        let errorMsg = 'Failed to get your location.';
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = 'Permission to access location was denied. Please check your browser settings.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = 'Location information is unavailable.';
        } else if (error.code === error.TIMEOUT) {
          errorMsg = 'Request to get user location timed out.';
        }
        setAlertMessage(errorMsg);
        setAlertSeverity('error');
        setShowAlert(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl 
                fullWidth 
                variant="outlined" 
                error={!!errors.category}
              >
                <InputLabel>Issue Category</InputLabel>
                <Select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  label="Issue Category"
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && (
                  <FormHelperText error>{errors.category}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Issue Description"
                variant="outlined"
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                helperText={errors.description || "Please provide detailed information about the issue"}
                error={!!errors.description}
              />
              
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={isLocating ? <CircularProgress size={20} color="inherit" /> : <LocationOn />}
                  onClick={handleGetCurrentLocation}
                  disabled={isLocating}
                >
                  {isLocating ? 'Locating...' : 'Use Current Location'}
                </Button>
              </Box>
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                helperText={errors.location || "Enter the exact location of the issue"}
                error={!!errors.location}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nearest Landmark"
                variant="outlined"
                value={formData.landmark}
                onChange={(e) =>
                  setFormData({ ...formData, landmark: e.target.value })
                }
                helperText="Optional: Provide a nearby landmark to help locate the issue"
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                sx={{
                  border: '2px dashed #ccc',
                  borderRadius: 1,
                  p: 3,
                  textAlign: 'center',
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="photo-upload"
                  multiple
                  type="file"
                  onChange={handlePhotoUpload}
                />
                <label htmlFor="photo-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<PhotoCamera />}
                    disabled={previewImages.length >= 3 || isUploading}
                  >
                    Upload Photos
                  </Button>
                </label>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Upload up to 3 photos (Max 5MB each)
                </Typography>
                
                {previewImages.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Uploaded Photos ({previewImages.length}/3)
                    </Typography>
                    <ImageList sx={{ width: '100%' }} cols={3} rowHeight={160}>
                      {previewImages.map((img, index) => (
                        <ImageListItem key={index} sx={{ position: 'relative' }}>
                          <img
                            src={img.preview}
                            alt={`Uploaded ${index + 1}`}
                            loading="lazy"
                            style={{ 
                              height: '160px', 
                              objectFit: 'cover',
                              borderRadius: '4px',
                              opacity: img.uploading ? 0.7 : 1
                            }}
                          />
                          {img.uploading ? (
                            <Box
                              sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <CircularProgress size={40} />
                            </Box>
                          ) : (
                            <IconButton
                              sx={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                bgcolor: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                '&:hover': {
                                  bgcolor: 'rgba(139, 0, 0, 0.8)',
                                },
                                p: '4px',
                              }}
                              onClick={() => handleRemoveImage(index)}
                            >
                              <Close fontSize="small" />
                            </IconButton>
                          )}
                          <Typography
                            variant="caption"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              bgcolor: 'rgba(0, 0, 0, 0.5)',
                              color: 'white',
                              padding: '4px',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {img.name}
                          </Typography>
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Box>
                )}
                
                {previewImages.length === 0 && !isUploading && (
                  <Box 
                    sx={{ 
                      mt: 3, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      color: 'text.secondary'
                    }}
                  >
                    <AddPhotoAlternate sx={{ fontSize: 60, opacity: 0.5, mb: 1 }} />
                    <Typography variant="body2">
                      No photos uploaded yet
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: 10,
        pb: 8,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderTop: '4px solid #8B0000',
          }}
        >
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiblIR3fnzNIFr77_Wm96HONRN7YTEfsRt1A&s"
              alt="Government Logo"
              style={{ height: '80px', marginBottom: '16px' }}
            />

            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: '#8B0000',
                fontWeight: 'bold',
              }}
            >
              Report Civic Issue
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
              Help us improve your community by reporting local issues
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit}>
            {renderStepContent(activeStep)}

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                disabled={isSubmitting}
              >
                {activeStep === steps.length - 1 ? (isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Submit Report') : 'Next'}
              </Button>
            </Box>
          </form>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            mt: 3,
            p: 3,
            bgcolor: '#8B0000',
            color: 'white',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Important Guidelines
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="body2">
                • Provide accurate location details
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2">
                • Include clear photos of the issue
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2">
                • Be specific in your description
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      
      <Snackbar 
        open={showAlert}
        autoHideDuration={6000} 
        onClose={handleCloseAlert} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ReportIssue;
