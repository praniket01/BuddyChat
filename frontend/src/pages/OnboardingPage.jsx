import { useState } from 'react';
import { focusManager, useMutation, useQueryClient } from '@tanstack/react-query';
import toast, { LoaderIcon } from "react-hot-toast";
import useAuthUser from "../hooks/useAuthUser.js";
import { completeOnboarding } from "../lib/api.js"
import { CameraIcon, CheckIcon, ShuffleIcon } from "lucide-react";
import { LANGUAGES } from '../constants/index.js';


const OnboardingPage = () => {

  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullname: authUser?.fullname || "",
    bio: authUser?.bio || "",
    nativelanguage: authUser?.nativelanguage || "",
    learninglanguage: authUser?.learninglanguage || "",
    location: authUser?.location || "",
    profilepic: authUser?.profilepic || "",
  })

  const { mutate: oboard, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile created Successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError : (error) => {
      toast.error(error.response.data.message);
    }
  })

  const handleRandomAvtar = () => {
    const randomIndex = Math.floor(Math.random() * 100) + 1;
    const randomAvtar = `https://avatar.iran.liara.run/public/${randomIndex}.png`

    setFormState({ ...formState, profilepic: randomAvtar })

    toast.success("Random Profile pic generated");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    oboard(formState);
  }

  return (


    <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Lets get you Onboarded</h1>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='flex flex-col items-center justify-center space-y-4'>
              <div className='size-32 rounded-full bg-base-300 overflow-hidden'>
                {formState.profilepic ? (
                  <img
                    src={formState.profilepic}
                    alt='profile Pic'
                    className='w-full h-full object-cover'
                  />

                ) : (
                  <div className='flex items-center justify-center h-full'>
                    <CameraIcon className='size-12 text-base-content opacity-50' />
                  </div>

                )}
              </div>

              <div className='flex items-center gap-2'>
                <button type='button' onClick={handleRandomAvtar} className='btn btn-accent'>
                  <ShuffleIcon className='size-4 mr-2' /> Generate Random Avtar
                </button>
              </div>
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>
                  Full Name
                </span>
              </label>
              <input
                type='text'
                name='fullname'
                value={formState.fullname}
                onChange={(e) => { setFormState({ ...formState, fullname: e.target.value }) }}
                placeholder='Your Full name'
                className=' input input-boarded w-full'
              />
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>
                  Bio
                </span>
              </label>
              <input
                type='text'
                name='bio'
                value={formState.bio}
                onChange={(e) => { setFormState({ ...formState, bio: e.target.value }) }}
                placeholder='Tell others about yourselves'
                className=' input input-boarded w-full'
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* NATIVE LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativelanguage}
                  onChange={(e) => setFormState({ ...formState, nativelanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* LEARNING LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formState.learninglanguage}
                  onChange={(e) => setFormState({ ...formState, learninglanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>
                  Location
                </span>
              </label>
              <input
                type='text'
                name='location'
                value={formState.location}
                onChange={(e) => { setFormState({ ...formState, location: e.target.value }) }}
                placeholder='City,Country'
                className=' input input-boarded w-full'
              />
            </div>


            <button className='btn btn-primary w-full'
              disabled={isPending}
              type='submit'
            >

              {!isPending ? (
                <>
                  <CheckIcon className='size-4 mr-2' />
                  Complete Onboarding
                </>


              ) : (
                <>
                  <LoaderIcon className='animate-spin size-5 mr-2' />
                  Onboarding...
                </>
              )
              }

            </button>
          </form>



        </div>

      </div>


    </div>
  )
}

export default OnboardingPage